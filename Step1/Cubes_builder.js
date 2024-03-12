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


    let superCub = new SuperCube()
    let tool = superCub.Devide(Devide_By_X, Devide_By_Y, Devide_By_Z)

    cubes.cubes_vertices = tool[0]
    cubes.cubes_indices = tool[1]


    cubes.cubes_vertices_count = cubes.cubes_vertices.length
    cubes.cubes_indices_count = cubes.cubes_indices.length
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

