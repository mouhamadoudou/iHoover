interface Card {
    x: number;
    y: number;
    d: string;
};


export class asp_class {
    constructor(
        public Dimension: Card,
        public Position: Card,
        public Instructions: string = ""
    ) {  }
}

const cardinale = {
    key: '',
    value: 0
}

export function check_input (Dimension: string, Position: string, Instructions: string): string {
    const regexDimension = /^\d+\s+\d+$/;
    const regexPosition = /^\d+\s+\d+\s+[NWES]$/;
    const regexInstructions = /^[AGD]+$/;
    
    if (!regexDimension.test(Dimension)) {
        console.log("laa 1");
        return "La syntaxe de la dimension n'est pas correcte. Voici un exemple correct: 10 10"
    }
    if (!regexPosition.test(Position)) {
        console.log("laa 2");
        return "La syntaxe de la dimension n'est pas correcte. Voici un exemple correct: 5 5 N"
    }
    if (!regexInstructions.test(Instructions)) {
        console.log("laa 3");
        return "La syntaxe des instructions n'est pas correcte. A avancer, G tourner à gauche et D tourner à droite"
    }
    return "";
}

export function set_direction(cmd: string, asp: asp_class) : boolean {
    switch (cmd) {
        case 'N':
            cardinale.key = 'y';
            cardinale.value = 1;
            break;
        case 'W':
            cardinale.key = 'x';
            cardinale.value = -1;
            break;
        case 'E':
            cardinale.key = 'x';
            cardinale.value = 1;
            break;
        case 'S':
            cardinale.key = 'y';
            cardinale.value = -1;
            break;
        default:
            break;
      }
    return true;
}


export function change_direction(cmd: string, asp: asp_class) : string {
    var direction = cmd + asp.Position.d;
    var result = '';
    
    if (direction === 'DN' || direction === 'GN') {
        result = direction === 'DN'? 'E': 'W';
    }
    if (direction === 'DW' || direction === 'GW') {
        result = direction === 'DW'? 'N': 'S';
    }
    if (direction === 'DS' || direction === 'GS') {
        result = direction === 'DS'? 'W': 'E'
    }
    if (direction === 'DE' || direction === 'GE') {
        result = direction === 'DE'? 'S': 'N'
    }
    return result;
}

export function moov(cmd: string, asp: asp_class) : boolean {
    const regex = /^[^A]$/;
    var tmp = 0;
    
    if (regex.test(cmd)) {
        return false;
    }

    if (cardinale.key === 'y') {
        tmp = asp.Position.y;
        asp.Position.y += cardinale.value;
        if(asp.Position.y > asp.Dimension.y || asp.Position.y < 0) {
            asp.Position.y = tmp;
        }
    } else {
        tmp = asp.Position.x;
        asp.Position.x += cardinale.value;
        if(asp.Position.x > asp.Dimension.x || asp.Position.x < 0) {
            asp.Position.x = tmp;
        }
    }
    return true;
}

export function main_algo(asp: asp_class): string {
    set_direction(asp.Position.d, asp);

    for (let i = 0; i < asp.Instructions.length; i++) {
        if (moov(asp.Instructions[i], asp)) {
            continue;
        } else {
            asp.Position.d = change_direction(asp.Instructions[i], asp);
            set_direction(asp.Position.d, asp);
        }
    }
    return 'Position finale x=' + asp.Position.x + ' y=' + asp.Position.y + ' orientation=' +  asp.Position.d;
}