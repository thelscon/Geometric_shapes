// Створіть класи Circle, Rectangle, Square і Triangle. 
// У кожного з них є загальнодоступний метод calculateArea. 
// У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення. 
// У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі

//Circle = Math.PI * r**2 
//Rectangle = a * b
//Square = a ** 2
//Triangle = (baseValue * heightValue) / 2 или s = (a + b + c) / 2 => Math.sqrt( s * (s - a) * (s - b) * (s - c) )

const enum EPrintArea {
    Rectangle = 'S = a * b' ,
    Square = 'S = a**2'
}

type calculateAreaType = ((valueA : number ) => number) 
            | ((valueA : number , valueB : number) => number) 
            | ((valueA : number , valueB : number , valueC ?: number) => number)
            
interface IGeometricFigures {
    readonly color : string ,
    readonly name : string ,

    calculateArea : calculateAreaType
}
interface ISquareRectanglePrint {
    print : () => string
}

//абстрактный класс всех фигур
abstract class GeometricFigures implements IGeometricFigures {
    constructor (
        public readonly color : string ,
        public readonly name : string
    ) {}

    abstract calculateArea : calculateAreaType
}

//абстрактный класс для Rectangle и Square с реализацией print() (используя ISquareRectanglePrint)
abstract class SquareRectanglePrint extends GeometricFigures implements ISquareRectanglePrint{
    protected abstract printArea : EPrintArea ;
    
    print () : string {
        return `Formula - ${this.printArea}` ;
    }
}


class Circle extends GeometricFigures {
    calculateArea = (radius : number ) => Math.PI * radius**2 ;
}
class Triangle extends GeometricFigures {
    calculateArea = (baseOrBaseA : number , heightOrBaseB : number , baseC ?: number) => {
        if ( baseC ) {
            const s : number = (baseOrBaseA + heightOrBaseB + baseC) / 2 ;
            return Math.sqrt( s * (s - baseOrBaseA) * (s - heightOrBaseB) * (s - baseC) ) ;
        }
        else
            return (baseOrBaseA * heightOrBaseB) / 2 ;
    }
}

class Rectangle extends SquareRectanglePrint {
    protected printArea = EPrintArea.Rectangle ;
    
    calculateArea = (sideA : number , sideB : number) => sideA * sideB ;
}
class Square extends SquareRectanglePrint {
    protected printArea = EPrintArea.Square ;

    calculateArea = (side : number) => side**2 ;
}