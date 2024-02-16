let ValueX = 2
let ValueY = 2
let ValueZ = 2


function getData() {
    ValueX = document.getElementById('input1').value;
    ValueY = document.getElementById('input2').value;
    ValueZ = document.getElementById('input3').value;

    webGLStart()
}

function webGLStart() {

    var canvas = document.getElementById("canvasGL");

    canvas.width = window.innerWidth - 370;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth - 370;
        canvas.height = window.innerHeight;
    });

    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.overflow = 'hidden';

    var gl = canvas.getContext("webgl", { antialias: false });

    initShaders(gl);

    var u_Pmatrix = gl.getUniformLocation(shaderProgram, 'u_Pmatrix');
    var u_Mmatrix = gl.getUniformLocation(shaderProgram, 'u_Mmatrix');
    var u_Vmatrix = gl.getUniformLocation(shaderProgram, 'u_Vmatrix');

    //======================================================================================================================
    //======================================================================================================================
    //======================================================================================================================
    //======================================================================================================================



    let superSube = new SuperCube()


    let tupple = superSube.Devide(ValueX, ValueY, ValueZ)
/*
    tupple =  [
        [...vertexes_With_MiddleVertexes],
        [...vertexes],
        [...indexes],
    ]
*/

    let vertexes = tupple[0]
    let indexes = tupple[2]


    //======================================================================================================================
    //======================================================================================================================
    //======================================================================================================================
    //======================================================================================================================


    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);

    let vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW)
    const positionAttrib = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.enableVertexAttribArray(positionAttrib);

    var PROJMATRIX = mat4.perspective(40, canvas.width / canvas.height, 1, 100);
    var VIEWMATRIX = mat4.create();
    var MODELMATRIX = mat4.create();

    mat4.identity(MODELMATRIX);
    mat4.identity(VIEWMATRIX);

    mat4.translate(VIEWMATRIX, [0.0, 0.0, -5.4]);
    mat4.translate(MODELMATRIX, [0.0, 0.0, 0.0]);
    mat4.scale(MODELMATRIX, [1.0, 1.0, 1.0]);
    mat4.rotateX(MODELMATRIX, 10);
    mat4.rotateY(MODELMATRIX, 10);
    mat4.rotateZ(MODELMATRIX, 0);

    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniformMatrix4fv(u_Pmatrix, false, PROJMATRIX);
    gl.uniformMatrix4fv(u_Mmatrix, false, MODELMATRIX);
    gl.uniformMatrix4fv(u_Vmatrix, false, VIEWMATRIX);

    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);

    gl.clearColor(0.1176, 0.1216, 0.1333, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var isDragging = false;
    var lastMouseX = 0;
    var lastMouseY = 0;

    canvas.addEventListener('mousedown', function (ev) {
        isDragging = true;
        lastMouseX = ev.clientX;
        lastMouseY = ev.clientY;
    });

    canvas.addEventListener('mouseup', function () {
        isDragging = false;
    });

    canvas.addEventListener('mousemove', function (ev) {
        if (!isDragging) return;

        var deltaX = ev.clientX - lastMouseX;
        var deltaY = ev.clientY - lastMouseY;

        lastMouseX = ev.clientX;
        lastMouseY = ev.clientY;

        let angle = 0.001;

        mat4.rotateY(MODELMATRIX, -angle * deltaX);
        mat4.rotateZ(MODELMATRIX, -angle * deltaY);

        gl.clearColor(0.1176, 0.1216, 0.1333, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniformMatrix4fv(u_Mmatrix, false, MODELMATRIX);
        gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);

        gl.drawElements(gl.LINES, indexes.length, gl.UNSIGNED_SHORT, 0);
        gl.drawArrays(gl.POINTS, 0, vertexes.length);
        gl.flush();
    });

    gl.clearColor(0.1176, 0.1216, 0.1333, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawElements(gl.LINES, indexes.length, gl.UNSIGNED_SHORT, 0);
    gl.flush();
}
webGLStart()