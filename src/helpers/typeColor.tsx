export function typeColorGenerator(pokemonType) {
    switch (pokemonType) {
        case "fire":
            return "red";
        case "grass":
            return "green";
        case "water":
            return "blue";
        case "bug":
            return "#84CC16";
        case "flying":
            return "#ADD8E6";
        case "poison":
            return "#7E22CE";
        case "electric":
            return "#FACC15";
        case "fairy":
            return "#DB2777";
        case "ground":
            return "#78350F";
        case "psychic":
            return "#F87171";
        case "fighting":
            return "#C2410C";
        case "rock":
            return "#CA8A04";
        case "ghost":
            return "#312E81";
        case "ice":
            return "#7DD3FC";
        case "dragon":
            return "#A78BFA";
        default:
            return "#A3A3A3";
    }
}
