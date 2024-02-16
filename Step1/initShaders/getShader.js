function getShader(gl, id, str){

    var shader;

    if(id == 'vs')       shader = gl.createShader(gl.VERTEX_SHADER);
    else if(id=='fs')    shader = gl.createShader(gl.FRAGMENT_SHADER);
    else                 return null;

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    return shader;
}