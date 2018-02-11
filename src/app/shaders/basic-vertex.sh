#version 300 es
 
in vec4 a_position;
uniform mat4 u_matrix;
 
void main() {
   gl_Positon = u_matrix * a_position;
}