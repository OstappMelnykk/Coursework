class Cube {

    #Points = []
    #Indices = [
        0, 1, 1, 2, 2, 3, 3, 0,
        0, 4,
        1, 5,
        2, 6,
        3, 7,
        4, 5, 5, 6, 6, 7, 7, 4,
    ]
    #MiddleEdgesPoints = []

    #MinX
    #MinY
    #MinZ

    #MaxX
    #MaxY
    #MaxZ

    constructor(
        _Points = [
                        new Point(-1, -1, -1, -1, 1),
                        new Point(-1, -1, 1, -1, 1),
                        new Point(-1, -1, 1, -1, -1),
                        new Point(-1, -1, -1, -1, -1),

                        new Point(-1, -1, -1, 1, 1),
                        new Point(-1, -1, 1, 1, 1),
                        new Point(-1, -1, 1, 1, -1),
                        new Point(-1, -1, -1, 1, -1),
                    ])
    {

        this.#Points = _Points;

        //задаємо значення індексам (InnerID) оскільки вони всі -1
        if (this.#Points.some(point => point.InnerID === -1)){
            let j = 1
            for(let i = 0; i < this.#Points.length; i++) {
                this.#Points[i].InnerID = j
                j++;
            }
        }

        //коли ми же маємо точки для побудовти куба, ми шукаємо серединні точки на кожній із граней,
        // цим точками даємо координати, індекси(InnerID) і кладемо їх всіх в масив MiddleEdgesPoints
        if (this.#Points.length === 8 ) {

            this.#Points.sort((a, b) => {
                return a.InnerID - b.InnerID;
            })

            let j = 9;
            for (let i = 0; i < this.#Indices.length; i += 2) {

                const index1 = this.#Indices[i];
                const index2 = this.#Indices[i + 1];

                const point1 = this.#Points[index1];
                const point2 = this.#Points[index2];

                if (
                    index1 === 0 && index2 === 1 ||
                    index1 === 2 && index2 === 3 ||
                    index1 === 4 && index2 === 5 ||
                    index1 === 6 && index2 === 7
                ){
                    const midX = (point1.X + point2.X) / 2;


                    this.#MiddleEdgesPoints.push(new Point(j, -1, midX, point1.Y, point1.Z));
                }


                if (
                    index1 === 1 && index2 === 2 ||
                    index1 === 3 && index2 === 0 ||
                    index1 === 5 && index2 === 6 ||
                    index1 === 7 && index2 === 4
                ){

                    const midZ = (point1.Z + point2.Z) / 2;

                    this.#MiddleEdgesPoints.push(new Point(j, -1, point1.X, point1.Y, midZ));
                }


                if (
                    index1 === 0 && index2 === 4 ||
                    index1 === 1 && index2 === 5 ||
                    index1 === 2 && index2 === 6 ||
                    index1 === 3 && index2 === 7
                ){

                    const midY = (point1.Y + point2.Y) / 2;

                    this.#MiddleEdgesPoints.push(new Point(j, -1, point1.X, midY, point1.Z));
                }
                j++;
            }
            //console.log(this.#MiddleEdgesPoints)


            let X_values_array = this.#Points.map(point => point.X);
            let Y_values_array = this.#Points.map(point => point.Y);
            let Z_values_array = this.#Points.map(point => point.Z);

            this.#MinX = Math.min(...X_values_array);
            this.#MinY = Math.min(...Y_values_array);
            this.#MinZ = Math.min(...Z_values_array);

            this.#MaxX = Math.max(...X_values_array);
            this.#MaxY = Math.max(...Y_values_array);
            this.#MaxZ = Math.max(...Z_values_array);
        }
    }

    set_innerIds(){
        let j = 1
        for(let i = 0; i < this.#Points.length; i++) {
            this.#Points[i].InnerID = j
            j++;
        }
    }

    //функція CalcNewPoints робиває відрізок a1a2 на задану кількість(num) частин
    // і повертає масив із точками на відрізку (num - 1 штука)
    CalcNewPoints(a1, a2, num) {
        if (num === 0){
            return []
        }

        let newPointsArray = [];
        let numSegments = num;

        // Перевірка на парність
        numSegments = num - 1;

        for (let i = 1; i <= numSegments; i++) {
            let ti = i / (numSegments + 1);
            let xi = (1 - ti) * a1 + ti * a2;
            newPointsArray.push(xi);
        }

        return newPointsArray;
    }

    DevideBy_X_axis(number){

        let x1 = this.#MinX
        let x2 = this.#MaxX

        let y1 = this.#MinY
        let y2 = this.#MaxY

        let z1 = this.#MinZ
        let z2 = this.#MaxZ




        let new_X_Points = [x1, ... this.CalcNewPoints(x1, x2, number), x2]

        //утворення квадратів за допомогою 4-ох точок  які розатшовані відповідно до знайдених точок поділу
        let Squares = []

        /*for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, new_X_Points[i], -1, 1),
                new Point(-1, -1, new_X_Points[i], -1, -1),
                new Point(-1, -1, new_X_Points[i], 1, 1),
                new Point(-1, -1, new_X_Points[i], 1, -1),
            ])
        }*/


        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, new_X_Points[i], y1, z2),
                new Point(-1, -1, new_X_Points[i], y1, z1),
                new Point(-1, -1, new_X_Points[i], y2, z2),
                new Point(-1, -1, new_X_Points[i], y2, z1),
            ])
        }




        let cubes = []

        for (let i = 0; i < number; i++){
            cubes.push([
                new Point(Squares[i][0].InnerID, Squares[i][0].GeneralID, Squares[i][0].X, Squares[i][0].Y, Squares[i][0].Z),
                new Point(Squares[i + 1][0].InnerID, Squares[i + 1][0].GeneralID, Squares[i + 1][0].X, Squares[i + 1][0].Y, Squares[i + 1][0].Z),
                new Point(Squares[i + 1][1].InnerID, Squares[i + 1][1].GeneralID, Squares[i + 1][1].X, Squares[i + 1][1].Y, Squares[i + 1][1].Z),
                new Point(Squares[i][1].InnerID, Squares[i][1].GeneralID, Squares[i][1].X, Squares[i][1].Y, Squares[i][1].Z),
                new Point(Squares[i][2].InnerID, Squares[i][2].GeneralID, Squares[i][2].X, Squares[i][2].Y, Squares[i][2].Z),
                new Point(Squares[i + 1][2].InnerID, Squares[i + 1][2].GeneralID, Squares[i + 1][2].X, Squares[i + 1][2].Y, Squares[i + 1][2].Z),
                new Point(Squares[i + 1][3].InnerID, Squares[i + 1][3].GeneralID, Squares[i + 1][3].X, Squares[i + 1][3].Y, Squares[i + 1][3].Z),
                new Point(Squares[i][3].InnerID, Squares[i][3].GeneralID, Squares[i][3].X, Squares[i][3].Y, Squares[i][3].Z),

               /* Squares[i][0],
                Squares[i + 1][0],
                Squares[i + 1][1],
                Squares[i][1],
                Squares[i][2],
                Squares[i + 1][2],
                Squares[i + 1][3],
                Squares[i][3],*/
            ])

        }


        return cubes
    }




    DevideBy_Y_axis(number){

        let x1 = this.#MinX
        let x2 = this.#MaxX

        let y1 = this.#MinY
        let y2 = this.#MaxY

        let z1 = this.#MinZ
        let z2 = this.#MaxZ

        let new_Y_Points = [y1, ... this.CalcNewPoints(y1, y2, number), y2]

        let Squares = []

        /*for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, -1, new_Y_Points[i], 1),
                new Point(-1, -1, 1, new_Y_Points[i], 1),
                new Point(-1, -1, 1, new_Y_Points[i], -1),
                new Point(-1, -1, -1, new_Y_Points[i], -1),
            ])
        }*/

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, x1, new_Y_Points[i], z2),
                new Point(-1, -1, x2, new_Y_Points[i], z2),
                new Point(-1, -1, x2, new_Y_Points[i], z1),
                new Point(-1, -1, x1, new_Y_Points[i], z1),
            ])
        }


        let cubes = []
        for (let i = 0; i < number; i++){
            cubes.push([
                new Point(Squares[i][0].InnerID, Squares[i][0].GeneralID, Squares[i][0].X, Squares[i][0].Y, Squares[i][0].Z),
                new Point(Squares[i][1].InnerID, Squares[i][1].GeneralID, Squares[i][1].X, Squares[i][1].Y, Squares[i][1].Z),
                new Point(Squares[i][2].InnerID, Squares[i][2].GeneralID, Squares[i][2].X, Squares[i][2].Y, Squares[i][2].Z),
                new Point(Squares[i][3].InnerID, Squares[i][3].GeneralID, Squares[i][3].X, Squares[i][3].Y, Squares[i][3].Z),

                new Point(Squares[i + 1][0].InnerID, Squares[i + 1][0].GeneralID, Squares[i + 1][0].X, Squares[i + 1][0].Y, Squares[i + 1][0].Z),
                new Point(Squares[i + 1][1].InnerID, Squares[i + 1][1].GeneralID, Squares[i + 1][1].X, Squares[i + 1][1].Y, Squares[i + 1][1].Z),
                new Point(Squares[i + 1][2].InnerID, Squares[i + 1][2].GeneralID, Squares[i + 1][2].X, Squares[i + 1][2].Y, Squares[i + 1][2].Z),
                new Point(Squares[i + 1][3].InnerID, Squares[i + 1][3].GeneralID, Squares[i + 1][3].X, Squares[i + 1][3].Y, Squares[i + 1][3].Z),


                /*Squares[i][0],
                Squares[i][1],
                Squares[i][2],
                Squares[i][3],

                Squares[i + 1][0],
                Squares[i + 1][1],
                Squares[i + 1][2],
                Squares[i + 1][3],*/
            ])
        }


        return cubes
    }


    DevideBy_Z_axis(number){

        let x1 = this.#MinX
        let x2 = this.#MaxX

        let y1 = this.#MinY
        let y2 = this.#MaxY

        let z1 = this.#MinZ
        let z2 = this.#MaxZ

        let new_Z_Points = [z1, ... this.CalcNewPoints(z1, z2, number), z2]

        let Squares = []

        /*for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, -1, -1, new_Z_Points[i]),
                new Point(-1, -1, 1, -1, new_Z_Points[i]),
                new Point(-1, -1, 1, 1, new_Z_Points[i]),
                new Point(-1, -1, -1, 1, new_Z_Points[i]),

            ])
        }*/

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, x1, y1, new_Z_Points[i]),
                new Point(-1, -1, x2, y1, new_Z_Points[i]),
                new Point(-1, -1, x2, y2, new_Z_Points[i]),
                new Point(-1, -1, x1, y2, new_Z_Points[i]),

            ])
        }


        let cubes = []
        for (let i = 0; i < number; i++){
            cubes.push([

                new Point(Squares[i + 1][0].InnerID, Squares[i + 1][0].GeneralID, Squares[i + 1][0].X, Squares[i + 1][0].Y, Squares[i + 1][0].Z),
                new Point(Squares[i + 1][1].InnerID, Squares[i + 1][1].GeneralID, Squares[i + 1][1].X, Squares[i + 1][1].Y, Squares[i + 1][1].Z),
                new Point(Squares[i][1].InnerID, Squares[i][1].GeneralID, Squares[i][1].X, Squares[i][1].Y, Squares[i][1].Z),
                new Point(Squares[i][0].InnerID, Squares[i][0].GeneralID, Squares[i][0].X, Squares[i][0].Y, Squares[i][0].Z),

                new Point(Squares[i + 1][3].InnerID, Squares[i + 1][3].GeneralID, Squares[i + 1][3].X, Squares[i + 1][3].Y, Squares[i + 1][3].Z),
                new Point(Squares[i + 1][2].InnerID, Squares[i + 1][2].GeneralID, Squares[i + 1][2].X, Squares[i + 1][2].Y, Squares[i + 1][2].Z),
                new Point(Squares[i][2].InnerID, Squares[i][2].GeneralID, Squares[i][2].X, Squares[i][2].Y, Squares[i][2].Z),
                new Point(Squares[i][3].InnerID, Squares[i][3].GeneralID, Squares[i][3].X, Squares[i][3].Y, Squares[i][3].Z),


                /*Squares[i + 1][0],
                Squares[i + 1][1],
                Squares[i][1],
                Squares[i][0],

                Squares[i + 1][3],
                Squares[i + 1][2],
                Squares[i][2],
                Squares[i][3],*/
            ])
        }


        return cubes
    }



    GetCubesVerteces_AsPoints(){
        return this.#Points
    }

    GetCubesMiddleEdgesPoints_AsPoints(){
        return this.#MiddleEdgesPoints
    }


    GetCubesVerteces_AsArray(){
        let CubesVerteces = []

        for (let vertex of this.#Points) {
            CubesVerteces.push(vertex.X)
            CubesVerteces.push(vertex.Y)
            CubesVerteces.push(vertex.Z)
        }
        return CubesVerteces
    }

    GetCubesMiddleEdgesPoints_AsArray(){
        let CubesMiddleEdgesPoints = []

        for (let point of this.#MiddleEdgesPoints){
            CubesMiddleEdgesPoints.push(point.X)
            CubesMiddleEdgesPoints.push(point.Y)
            CubesMiddleEdgesPoints.push(point.Z)
        }
            //CubesMiddleEdgesPoints.push(point.X, point.Y, point.Z)

        return CubesMiddleEdgesPoints
    }

    GetIndicesToBuildCube(){
        return this.#Indices
    }



    get Points(){
        return this.#Points
    }
    set Points(_Points){
        this.#Points = [... _Points]
    }

    get MiddleEdgesPoints(){
        return this.#MiddleEdgesPoints
    }
    set MiddleEdgesPoints(_MiddleEdgesPoints){
        this.#MiddleEdgesPoints = [... _MiddleEdgesPoints]
    }

    get Indices(){
        return this.#Indices
    }
    set Indices(_Indices){
        this.#Indices = [... _Indices]
    }



    get MinX(){
        return this.#MinX
    }
    get MinY(){
        return this.#MinY
    }
    get MinZ(){
        return this.#MinZ
    }


    get MaxX(){
        return this.#MaxX
    }
    get MaxY(){
        return this.#MaxY
    }
    get MaxZ(){
        return this.#MaxZ
    }


    print() {
        console.log("Cube:");
        for (const point of this.#Points) {
            point.print();
        }
    }
}




