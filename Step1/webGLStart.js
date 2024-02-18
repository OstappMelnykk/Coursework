function updateGame(e) {
    bufferUpdate(this.gl, cubesBuild());
    matrixUpdate(this.gl);
}
function webGLStart() {

    var canvas = document.getElementById("canvasGL");

    canvas.width = window.innerWidth - 270;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth - 270;
        canvas.height = window.innerHeight;
    });

    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.overflow = 'hidden';



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


   /* var delta = 0
    var direction = 0
    var translationAmount = 0
    var total_translationAmount = 0
    var maxDistance = 10;
    var minDistance = 1;

    function handleMouseRotation(event) {

       /!* delta = event.deltaY || event.detail || event.wheelDelta;
        direction = (delta > 0) ? 1 : -1;
        translationAmount = (direction === 1) ? -0.1 : 0.1;*!/

        delta = event.deltaY || event.detail || event.wheelDelta;
        direction = (delta > 0) ? 1 : -1;
        translationAmount = (direction === 1) ? -0.1 : 0.1;
        total_translationAmount += translationAmount
    }

    canvas.addEventListener("wheel", handleMouseRotation);*/



    var animate = function () {

        gl.clearColor(0.1176, 0.1216, 0.1333, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        mat4.identity(gl.MODELMATRIX_CUBES);
        mat4.rotateY(gl.MODELMATRIX_CUBES, rotationY);
        mat4.rotateX(gl.MODELMATRIX_CUBES, rotationX);



/*
        /!*if (direction === 1 && total_translationAmount < 10.0 && total_translationAmount > 0.5){
            mat4.translate(gl.VIEWMATRIX, [0, 0, translationAmount]);
        }*!/
        if (direction === 1) {

            if (total_translationAmount > 0.1){
                mat4.translate(gl.VIEWMATRIX, [0, 0, translationAmount]);
                console.log(`[0, 0, ${translationAmount}]`)
            }
        } else {
            if (direction === 1 && total_translationAmount < 6.0){
                mat4.translate(gl.VIEWMATRIX, [0, 0, translationAmount]);
                console.log(`[0, 0, ${translationAmount}]`)
            }
        }*/





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