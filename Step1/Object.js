class Object {

    /*#supercube = new SuperCube()


    #defaulpoints = [
        new Point(-1, -1, -1.3, -1, -0.6),
        new Point(-1, -1, 1.1, -1.7, -1),
        new Point(-1, -1, -1, -1, 1),
        new Point(-1, -1, 1.2, -1, 1.1),
        new Point(-1, -1, -1.1, 1.2, -1),
        new Point(-1, -1, 1, 0.7, -1.2),
        new Point(-1, -1, -1, 1.1, 1.11111),
        new Point(-1, -1, 1, 1.3, 1),
    ];

    #MiddlePoints = []

    constructor() {

        this.CalculateMiddlePoints()
        this.#MiddlePoints.sort(this.Global_Numeration_Sorting)
    }


    DevideObject(){
        let a = this.supercube.Devide(num_X, num_Y, num_Z)[1]

    }

    CountX(){
        let x;
        for (let i = 0; i < 8; i++) {
            x +=
        }

    }*/




    #Points = []
    #MiddlePoints = []

    #StaticCnnectionIndices = [
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 4, 1, 5, 2, 6, 3, 7],
        [0, 2, 1, 3, 4, 6, 5, 7],
    ]


    #defaulpoints = [
        new Point(-1, -1, -1.3, -1, -0.6),
        new Point(-1, -1, 1.1, -1.7, -1),
        new Point(-1, -1, -1, -1, 1),
        new Point(-1, -1, 1.2, -1, 1.1),
        new Point(-1, -1, -1.1, 1.2, -1),
        new Point(-1, -1, 1, 0.7, -1.2),
        new Point(-1, -1, -1, 1.1, 1.11111),
        new Point(-1, -1, 1, 1.3, 1),
    ];

    GetPointsToDraw(){
        let CubePointsForDrawing = []

        for (let point of this.#defaulpoints) {
            CubePointsForDrawing.push(point.X)
            CubePointsForDrawing.push(point.Y)
            CubePointsForDrawing.push(point.Z)
        }

        return CubePointsForDrawing
    }

    GetIndicesToDraw(){
        let IndicesToDraw = []
        for (let i = 0; i < this.#StaticCnnectionIndices.length; i++)
            IndicesToDraw.push(...this.#StaticCnnectionIndices[i])
        return IndicesToDraw
    }

    DrawingTool(){

        console.log(this.GetPointsToDraw())
        console.log(this.GetIndicesToDraw())
        return [
            this.GetPointsToDraw(),
            this.GetIndicesToDraw(),
        ]
    }
}