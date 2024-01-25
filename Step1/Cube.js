class Cube {
    #Points
    constructor(_Points = [
        new Point(-1, -1, 0, 0, 0),
        new Point(-1, -1, 0, 0, 0),
        new Point(-1, -1, 0, 0, 0),
        new Point(-1, -1, 0, 0, 0),
        new Point(-1, -1, 0, 0, 0),
        new Point(-1, -1, 0, 0, 0),
        new Point(-1, -1, 0, 0, 0),
        new Point(-1, -1, 0, 0, 0),
    ]) {
        this.#Points = _Points;
    }

    set Points(Points){ this.#Points= Points; }
    get Points(){ return this.#Points; }
    print() {
        for (const point of this.#Points) {
            console.log("Cube:");
            point.print();
        }
    }



}