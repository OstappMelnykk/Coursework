class Cube {
    constructor(_Points = [
        new Point(),
        new Point(),
        new Point(),
        new Point(),
        new Point(),
        new Point(),
        new Point(),
        new Point(),
    ]) {
        this.Points = _Points;
    }

    print() {
        for (const point of this.Points) {
            console.log("Cube:");
            point.print();
        }
    }
}