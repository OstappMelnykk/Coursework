class SuperCube {
    Cubes;
    constructor(_Cubes = [new Cube(),])
    {
        this.Cubes = _Cubes;
    }

    print() {
        console.log("SuperCube:");
        for (const cube of this.Cubes) {
            cube.print();
        }
    }
}
