var VSHADER_SOURCE = `
            attribute vec3 a_Position;

            uniform mat4 u_Pmatrix;
            uniform mat4 u_Mmatrix;
            uniform mat4 u_Vmatrix;
            uniform vec3 u_Color;

            varying vec3 v_Color;

            void main() {
                gl_PointSize = 6.0;
                v_Color = u_Color;
                gl_Position = u_Pmatrix*u_Vmatrix*u_Mmatrix*vec4(a_Position,1.0);
                
            } 
        `


var FSHADER_SOURCE = `
            precision mediump float;

            uniform vec4 u_FragColor;
            varying vec3 v_Color;

            void main() {
                gl_FragColor = vec4(v_Color,1.0);
                
            }
        `