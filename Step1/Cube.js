class Cube {

    Points = []
    MiddleEdgesPoints = []
    Indexes = []
    //Vertexes = []

    constructor(_Points = [
        new Point(1, -1, -1, -1, 1),
        new Point(2, -1, 1, -1, 1),
        new Point(3, -1, 1, -1, -1),
        new Point(4, -1, -1, -1, -1),

        new Point(5, -1, -1, 1, 1),
        new Point(6, -1, 1, 1, 1),
        new Point(7, -1, 1, 1, -1),
        new Point(8, -1, -1, 1, -1),
    ]) {
        this.Points = _Points;
        //this.MiddleEdgesPoints = _MiddleEdgesPoints;


        if (!this.Points.some(point => point.InnerID === -1)) {

            this.Points.sort((a, b) => {
                return a.InnerID - b.InnerID;
            })

            this.Indexes = [
                0, 1, 1, 2, 2, 3, 3, 0,
                0, 4,
                1, 5,
                2, 6,
                3, 7,
                4, 5, 5, 6, 6, 7, 7, 4,
            ]


            let j = 9;

            this.Indexes.forEach((value, index, array) => {
                if (index % 2 === 0) {

                    let startIdx = value;
                    let endIdx = array[index + 1];
                    let startPoint = this.Points[startIdx];
                    let endPoint = this.Points[endIdx];

                    let newX = (startPoint.X + endPoint.X) / 2
                    let newY = (startPoint.Y + endPoint.Y) / 2
                    let newZ = (startPoint.Z + endPoint.Z) / 2


                    let newPoint = new Point(j, -1, newX, newY, newZ);

                    this.MiddleEdgesPoints.push(newPoint);
                    j++;
                }
            });

        }
    }


    GetCubesVertexes(){
        let tempCubesPoints = []
        for (let point of this.Points){
            tempCubesPoints.push(point.X)
            tempCubesPoints.push(point.Y)
            tempCubesPoints.push(point.Z)
        }
        return tempCubesPoints
    }

    GetAllVertexes(){
        let tempAllPoints = []
        for (let point of [... this.Points, ... this.MiddleEdgesPoints]){
            tempAllPoints.push(point.X)
            tempAllPoints.push(point.Y)
            tempAllPoints.push(point.Z)

        }
        return tempAllPoints
    }

    GetCubesIndexes(){
        let tempIndexes = []
        for (let index of [... this.Indexes]){
            tempIndexes.push(index)
        }
        return tempIndexes
    }


    print() {
        console.log("Cube:");
        for (const point of this.Points) {
            point.print();
        }
    }

    printAll() {
        console.log("Cube:");
        for (const point of [... this.Points, ... this.MiddleEdgesPoints]) {
            point.print();
        }
    }
}