import { Injectable } from '@angular/core';
import { Vector3, Matrix3 } from 'three';

@Injectable()
export class TextHelperService {

  constructor() { }

  prettyPrintMatrix3(matrix3: Matrix3): string {
    const t = matrix3.clone().transpose().toArray();
    return `[${t[0]}, ${t[1]}, ${t[2]}\n${t[3]}, ${t[4]}, ${t[5]}\n${t[6]}, ${t[7]}, ${t[8]}]`;
  }

  prettyPrintVector3(vector: Vector3): string {
    return `[${vector.x}, ${vector.y}, ${vector.z}]`;
  }

}
