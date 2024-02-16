function cubesBuild() {

    var Devide_By_X =  parseFloat(document.getElementById("Value_X").value);
    var Devide_By_Y =  parseFloat(document.getElementById("Value_Y").value);
    var Devide_By_Z =  parseFloat(document.getElementById("Value_Z").value);

    var cubes = {
        cubes_vertices : null,
        cubes_indices : null,
        cubes_vertices_count : null,
        cubes_indices_count : null,
        AKT: null,
        NT: null,
    };

    let supercube = new SuperCube()
    let tool = supercube.Devide(Devide_By_X, Devide_By_Y, Devide_By_Z)


    cubes.cubes_vertices = tool[2]
    cubes.cubes_indices = tool[3]
    cubes.cubes_vertices_count = cubes.cubes_vertices.length
    cubes.cubes_indices_count = cubes.cubes_indices.length
    cubes.AKT = supercube.cretae_AKT_array()
    cubes.NT = supercube.cretae_NT_array()

    return cubes;
}



function bufferUpdate(gl, cubes) {


    gl.CUBES_VERTICES_BUFFER = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,gl.CUBES_VERTICES_BUFFER);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(cubes.cubes_vertices),gl.STATIC_DRAW);

    //indices
    /*CUBES_INDICES_BUFFER*/
    gl.CUBES_INDICES_BUFFER = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.CUBES_INDICES_BUFFER);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(cubes.cubes_indices),gl.STATIC_DRAW);

    gl.cubes = cubes;
}

function matrixUpdate(gl) {

    var PROJMATRIX = mat4.perspective(40, gl.canvas.width / gl.canvas.height, 1, 800);
    var MODELMATRIX_CUBES = mat4.create();
    var VIEWMATRIX = mat4.create();

    mat4.identity(MODELMATRIX_CUBES);
    mat4.identity(VIEWMATRIX);

    mat4.rotateX(MODELMATRIX_CUBES, 1.0);
    mat4.translate(VIEWMATRIX, [0.0, 0.0, -5.0]);


    gl.PROJMATRIX = PROJMATRIX;
    gl.MODELMATRIX_CUBES = MODELMATRIX_CUBES;
    gl.VIEWMATRIX = VIEWMATRIX;
}
















function updateGame(e) {
    bufferUpdate(this.gl, cubesBuild());
    matrixUpdate(this.gl);
}
function webGLStart() {

    var canvas = document.getElementById("canvasGL");

    canvas.width  = 800;
    canvas.height = 800;

    var gl = canvas.getContext("webgl", {antialias: false});
    gl.canvas =canvas;

    var button = document.getElementById('update');
    button.addEventListener("click",{ handleEvent:updateGame, gl: gl }, false);

    var shaderProgram  = createDomShaderProgram(gl);

    var u_Pmatrix = gl.getUniformLocation(shaderProgram,'u_Pmatrix');
    var u_Mmatrix = gl.getUniformLocation(shaderProgram,'u_Mmatrix');
    var u_Vmatrix = gl.getUniformLocation(shaderProgram,'u_Vmatrix');
    var u_Color   = gl.getUniformLocation(shaderProgram,'u_Color');
    var a_Position  = gl.getAttribLocation(shaderProgram,'a_Position');

    gl.enableVertexAttribArray(a_Position);



    var cubes = cubesBuild();
    bufferUpdate(gl, cubes);
    matrixUpdate(gl);




    var rotationY = 0;
    var rotationX = 0;
    var mouseX = 0;
    var mouseY = 0;
    var isMouseDown = false;
    var prevMouseX;
    var prevMouseY;

    // Додавання обробників подій миші

    canvas.addEventListener('mousedown', function (event) {
        if (event.button === 0) {
            isMouseDown = true;
        }
    });

    document.addEventListener('mouseup', function (event) {
        if (event.button === 0) {
            isMouseDown = false;
            prevMouseX = undefined;
            prevMouseY = undefined;
        }
    });

    canvas.addEventListener('mousemove', function (event) {
        if (isMouseDown) {
            var canvasRect = canvas.getBoundingClientRect();
            mouseX = event.clientX - canvasRect.left;
            mouseY = event.clientY - canvasRect.top;

            if (prevMouseX !== undefined && prevMouseY !== undefined) {
                var deltaX = mouseX - prevMouseX;
                var deltaY = mouseY - prevMouseY;
                rotationY += 0.0045 * deltaX;
                rotationX += 0.0045 * deltaY;

            }
            prevMouseX = mouseX;
            prevMouseY = mouseY;
        }
    });



    var animate = function () {

        gl.clearColor(0.1176, 0.1216, 0.1333, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        mat4.identity(gl.MODELMATRIX_CUBES);
        mat4.rotateY(gl.MODELMATRIX_CUBES, rotationY);
        mat4.rotateX(gl.MODELMATRIX_CUBES, rotationX);



        gl.uniformMatrix4fv(u_Pmatrix, false, gl.PROJMATRIX);
        gl.uniformMatrix4fv(u_Vmatrix, false, gl.VIEWMATRIX);
        gl.uniform3f(u_Color, 0.7, 0.7, 0.7);

        gl.uniformMatrix4fv(u_Mmatrix, false, gl.MODELMATRIX_CUBES);


        gl.bindBuffer(gl.ARRAY_BUFFER,gl.CUBES_VERTICES_BUFFER);
        gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,4*(3),0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.CUBES_INDICES_BUFFER);
        gl.drawElements(gl.LINES,gl.cubes.cubes_indices_count, gl.UNSIGNED_SHORT, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER,gl.CUBES_VERTICES_BUFFER);
        gl.drawArrays(gl.POINTS, 0, gl.cubes.cubes_vertices_count);

        gl.flush();
        window.requestAnimationFrame(animate);
    }
    animate();
}