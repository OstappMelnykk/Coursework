class Cube {

    #Points = []
    #MiddlePoints = []
    #Indices = [
        0, 1, 1, 2, 2, 3, 3, 0,
        0, 4,
        1, 5,
        2, 6,
        3, 7,
        4, 5, 5, 6, 6, 7, 7, 4,
    ]

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

        if (this.#Points.some(point => point.InnerID === -1)){
            let j = 1
            for(let i = 0; i < this.#Points.length; i++) {
                this.#Points[i].InnerID = j
                j++;
            }
        }

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


                    this.#MiddlePoints.push(new Point(j, -1, midX, point1.Y, point1.Z));
                }



                if (
                    index1 === 1 && index2 === 2 ||
                    index1 === 3 && index2 === 0 ||
                    index1 === 5 && index2 === 6 ||
                    index1 === 7 && index2 === 4
                ){
                    const midZ = (point1.Z + point2.Z) / 2;
                    this.#MiddlePoints.push(new Point(j, -1, point1.X, point1.Y, midZ));
                }



                if (
                    index1 === 0 && index2 === 4 ||
                    index1 === 1 && index2 === 5 ||
                    index1 === 2 && index2 === 6 ||
                    index1 === 3 && index2 === 7
                ){
                    const midY = (point1.Y + point2.Y) / 2;
                    this.#MiddlePoints.push(new Point(j, -1, point1.X, midY, point1.Z));
                }
                j++;
            }



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

    CalcNewPoints(a1, a2, num) {
        if (num === 0)
            return []

        let newPointsArray = [];
        let numSegments = num;

        numSegments = num - 1;

        for (let i = 1; i <= numSegments; i++) {
            let ti = i / (numSegments + 1);
            let xi = (1 - ti) * a1 + ti * a2;
            newPointsArray.push(xi);
        }
        return newPointsArray;
    }

    DevideBy_X_axis(number){
        let new_X_Points = [this.#MinX, ... this.CalcNewPoints(this.#MinX, this.#MaxX, number), this.#MaxX]

        let Squares = []
        let cubes = []

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, new_X_Points[i], this.#MinY, this.#MaxZ),
                new Point(-1, -1, new_X_Points[i], this.#MinY, this.#MinZ),
                new Point(-1, -1, new_X_Points[i], this.#MaxY, this.#MaxZ),
                new Point(-1, -1, new_X_Points[i], this.#MaxY, this.#MinZ),
            ])
        }

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
            ])
        }
        return cubes
    }


    DevideBy_Y_axis(number){
        let new_Y_Points = [this.#MinY, ... this.CalcNewPoints(this.#MinY, this.#MaxY, number), this.#MaxY]

        let Squares = []
        let cubes = []

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, this.#MinX, new_Y_Points[i], this.#MaxZ),
                new Point(-1, -1, this.#MaxX, new_Y_Points[i], this.#MaxZ),
                new Point(-1, -1, this.#MaxX, new_Y_Points[i], this.#MinZ),
                new Point(-1, -1, this.#MinX, new_Y_Points[i], this.#MinZ),
            ])
        }

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
            ])
        }
        return cubes
    }


    DevideBy_Z_axis(number){

        let new_Z_Points = [this.#MinZ, ... this.CalcNewPoints(this.#MinZ, this.#MaxZ, number), this.#MaxZ]

        let Squares = []
        let cubes = []

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, this.#MinX, this.#MinY, new_Z_Points[i]),
                new Point(-1, -1, this.#MaxX, this.#MinY, new_Z_Points[i]),
                new Point(-1, -1, this.#MaxX, this.#MaxY, new_Z_Points[i]),
                new Point(-1, -1, this.#MinX, this.#MaxY, new_Z_Points[i]),
            ])
        }

        for (let i = 0; i < number; i++) {
            cubes.push([
                new Point(Squares[i + 1][0].InnerID, Squares[i + 1][0].GeneralID, Squares[i + 1][0].X, Squares[i + 1][0].Y, Squares[i + 1][0].Z),
                new Point(Squares[i + 1][1].InnerID, Squares[i + 1][1].GeneralID, Squares[i + 1][1].X, Squares[i + 1][1].Y, Squares[i + 1][1].Z),
                new Point(Squares[i][1].InnerID, Squares[i][1].GeneralID, Squares[i][1].X, Squares[i][1].Y, Squares[i][1].Z),
                new Point(Squares[i][0].InnerID, Squares[i][0].GeneralID, Squares[i][0].X, Squares[i][0].Y, Squares[i][0].Z),

                new Point(Squares[i + 1][3].InnerID, Squares[i + 1][3].GeneralID, Squares[i + 1][3].X, Squares[i + 1][3].Y, Squares[i + 1][3].Z),
                new Point(Squares[i + 1][2].InnerID, Squares[i + 1][2].GeneralID, Squares[i + 1][2].X, Squares[i + 1][2].Y, Squares[i + 1][2].Z),
                new Point(Squares[i][2].InnerID, Squares[i][2].GeneralID, Squares[i][2].X, Squares[i][2].Y, Squares[i][2].Z),
                new Point(Squares[i][3].InnerID, Squares[i][3].GeneralID, Squares[i][3].X, Squares[i][3].Y, Squares[i][3].Z),
            ])
        }
        return cubes
    }


    getPointsAs_xyz()
    {
        let CubesVerteces = []

        for (let vertex of this.#Points) {
            CubesVerteces.push(vertex.X)
            CubesVerteces.push(vertex.Y)
            CubesVerteces.push(vertex.Z)
        }
        return CubesVerteces
    }

    getMiddlePointsAs_xyz(){
        let CubesMiddlePoints = []

        for (let point of this.#MiddlePoints){
            CubesMiddlePoints.push(point.X)
            CubesMiddlePoints.push(point.Y)
            CubesMiddlePoints.push(point.Z)
        }

        return CubesMiddlePoints
    }


    get Points(){
        return this.#Points
    }
    set Points(_Points){
        this.#Points = [... _Points]
    }

    get MiddlePoints(){
        return this.#MiddlePoints
    }
    set MiddlePoints(_MiddlePoints){
        this.#MiddlePoints = [... _MiddlePoints]
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