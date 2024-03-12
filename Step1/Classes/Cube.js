class Cube{
    #Id
    #Points  = []
    #Indices = [
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 4, 1, 5, 2, 6, 3, 7,
        0, 2, 1, 3, 4, 6, 5, 7,
    ]
    #IndicesToDraw = [
        0, 1, 1, 2, 5, 6, 6, 7, 12, 13, 13, 14, 17, 18, 18, 19,
        0, 8, 8, 12, 2, 9, 9, 14, 5, 10, 10, 17, 7, 11, 11, 19,
        0, 3, 3, 5, 2, 4, 4, 7, 12, 15, 15, 17, 14, 16, 16, 19
    ]

    #MinX
    #MinY
    #MinZ

    #MaxX
    #MaxY
    #MaxZ

    #CenterPoint


    constructor(Id = 1, CubePoints = [
        new Point(-1, -1, -1, -1, -1),
        new Point(-1, -1, 1, -1, -1),
        new Point(-1, -1, -1, -1, 1),
        new Point(-1, -1, 1, -1, 1),

        new Point(-1, -1, -1, 1, -1),
        new Point(-1, -1, 1, 1, -1),
        new Point(-1, -1, -1, 1, 1),
        new Point(-1, -1, 1, 1, 1),
    ]) {
        this.#Id = (Id <= 0) ? 1 : Id
        this.#IndicesToDraw = this.#IndicesToDraw.map(element => element + 20 * (this.#Id - 1))

        if (CubePoints.length !== 8) {
            CubePoints = [
                new Point(-1, -1, -1, -1, -1),
                new Point(-1, -1, 1, -1, -1),
                new Point(-1, -1, -1, -1, 1),
                new Point(-1, -1, 1, -1, 1),

                new Point(-1, -1, -1, 1, -1),
                new Point(-1, -1, 1, 1, -1),
                new Point(-1, -1, -1, 1, 1),
                new Point(-1, -1, 1, 1, 1),
            ]
        }

        CubePoints.sort(this.Global_Numeration_Sorting)

        this.#Points.push(...CubePoints)
        this.CalcMiddlePoints(CubePoints)
        this.CalcMinMax()


        this.#Points[0].LocalID = 1
        this.#Points[1].LocalID = 9
        this.#Points[2].LocalID = 2
        this.#Points[3].LocalID = 12
        this.#Points[4].LocalID = 10
        this.#Points[5].LocalID = 4
        this.#Points[6].LocalID = 11
        this.#Points[7].LocalID = 3
        this.#Points[8].LocalID = 13
        this.#Points[9].LocalID = 14
        this.#Points[10].LocalID = 16
        this.#Points[11].LocalID = 15
        this.#Points[12].LocalID = 5
        this.#Points[13].LocalID = 17
        this.#Points[14].LocalID = 6
        this.#Points[15].LocalID = 20
        this.#Points[16].LocalID = 18
        this.#Points[17].LocalID = 8
        this.#Points[18].LocalID = 19
        this.#Points[19].LocalID = 7


        this.#CenterPoint = new Point(-1, -1,
            (this.#MinX + this.#MaxX) / 2,
            (this.#MinY + this.#MaxY) / 2,
            (this.#MinZ + this.#MaxZ) / 2,)

    }


    CalcMiddlePoints(CubePoints){
        for (let i = 0; i < this.#Indices.length; i += 2) {
            let idx1 = this.#Indices[i]
            let idx2 = this.#Indices[i + 1]

            const point1 = CubePoints[idx1];
            const point2 = CubePoints[idx2];

            let midX = (point1.X + point2.X) / 2
            let midY = (point1.Y + point2.Y) / 2
            let midZ = (point1.Z + point2.Z) / 2

            this.#Points.push(new Point(-1, -1, midX, midY, midZ))
        }
        this.#Points.sort(this.Global_Numeration_Sorting)
    }
    Global_Numeration_Sorting(point1, point2) {
        if (point1.Y !== point2.Y)
            return point1.Y - point2.Y;
        if (point1.Z !== point2.Z)
            return point1.Z - point2.Z;

        return point1.X - point2.X;
    }
    CalcMinMax(){
        this.#MinX = this.#Points[0].X;
        this.#MinY = this.#Points[0].Y;
        this.#MinZ = this.#Points[0].Z;

        this.#MaxX = this.#Points[19].X;
        this.#MaxY = this.#Points[19].Y;
        this.#MaxZ = this.#Points[19].Z;
    }
    CalcNewPoints(coordinate1, coordinate2, num) {
        if (num === 0)
            return []
        let newPointsArray = [];
        let numSegments = num;
        numSegments = num - 1;
        for (let i = 1; i <= numSegments; i++) {
            let ti = i / (numSegments + 1);
            let xi = (1 - ti) * coordinate1  +  ti * coordinate2;
            newPointsArray.push(parseFloat(xi.toFixed(5)));
        }
        return newPointsArray;
    }
    DevideBy_X_axis(number){
        let new_X_Points = [this.#MinX, ... this.CalcNewPoints(this.#MinX, this.#MaxX, number), this.#MaxX]

        let Squares = []
        let cubes = []

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, new_X_Points[i], this.#MinY, this.#MinZ),
                new Point(-1, -1, new_X_Points[i], this.#MinY, this.#MaxZ),
                new Point(-1, -1, new_X_Points[i], this.#MaxY, this.#MinZ),
                new Point(-1, -1, new_X_Points[i], this.#MaxY, this.#MaxZ),

            ])
        }

        for (let i = 0; i < number; i++){
            cubes.push(new Cube(-1,[
                Squares[i][0].copy(),
                Squares[i + 1][0].copy(),
                Squares[i][1].copy(),
                Squares[i + 1][1].copy(),

                Squares[i][2].copy(),
                Squares[i + 1][2].copy(),
                Squares[i][3].copy(),
                Squares[i + 1][3].copy(),
            ]))
        }
        return cubes
    }
    DevideBy_Y_axis(number){
        let new_Y_Points = [this.#MinY, ... this.CalcNewPoints(this.#MinY, this.#MaxY, number), this.#MaxY]

        let Squares = []
        let cubes = []

        for (let i = 0; i < number + 1; i++){
            Squares.push([
                new Point(-1, -1, this.#MinX, new_Y_Points[i], this.#MinZ),
                new Point(-1, -1, this.#MaxX, new_Y_Points[i], this.#MinZ),
                new Point(-1, -1, this.#MinX, new_Y_Points[i], this.#MaxZ),
                new Point(-1, -1, this.#MaxX, new_Y_Points[i], this.#MaxZ),

            ])
        }

        for (let i = 0; i < number; i++){

            cubes.push(new Cube(-1,[
                Squares[i][0].copy(),
                Squares[i][1].copy(),
                Squares[i][2].copy(),
                Squares[i][3].copy(),


                Squares[i + 1][0].copy(),
                Squares[i + 1][1].copy(),
                Squares[i + 1][2].copy(),
                Squares[i + 1][3].copy(),
            ]))
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
                new Point(-1, -1, this.#MinX, this.#MaxY, new_Z_Points[i]),
                new Point(-1, -1, this.#MaxX, this.#MaxY, new_Z_Points[i]),

            ])
        }

        for (let i = 0; i < number; i++){

            cubes.push(new Cube(-1,[
                Squares[i][0].copy(),
                Squares[i][1].copy(),
                Squares[i + 1][0].copy(),
                Squares[i + 1][1].copy(),


                Squares[i][2].copy(),
                Squares[i][3].copy(),
                Squares[i + 1][2].copy(),
                Squares[i + 1][3].copy(),
            ]))
        }
        return cubes
    }
    GetPointsToDraw(){

        let arr = []

        for (let point of this.#Points) {
            arr.push(point.X)
            arr.push(point.Y)
            arr.push(point.Z)
        }

        return arr
    }
    DrawingTool(){
        return [
            this.GetPointsToDraw(),
            this.#IndicesToDraw,
        ]
    }
    ChangeCnnectionIndices(i = this.#Id - 1){
        this.#IndicesToDraw = this.#IndicesToDraw.map(element => element + 20 * i)
    }

    set Id(_Id){
        this.#Id = _Id
        this.ChangeCnnectionIndices()
    }


    get Points(){ return [...this.#Points] }
    get IndicesToDraw(){ return [...this.#IndicesToDraw] }
    get CenterPoint(){ return this.#CenterPoint }

}