export function changeColor(color1, color2, factor) {
    let currentColor = [];
    for (let i in color1) {
        currentColor[i] = color1[i].map((element, j) => element + (color2[i][j] - element) * factor)
    }  
    return currentColor;
}

export function setDayNight(x, y, radius) {
    let backgroundColor, windowColor, lightBulb, textColor;
    const dayTime = [
                [171, 221, 244], 
                [185, 216, 238], 
                [231, 245, 248],
                [171, 191, 107], 
                [117, 133, 81]
            ];
    const nightTime = [
                [21, 35, 42], 
                [40, 53, 61], 
                [84, 105, 109],
                [38, 41, 27], 
                [91, 102, 64]
            ];
    const sunrise = [
            [240, 215, 173], 
            [237, 198, 145], 
            [227, 149, 89],
            [90, 110, 27], 
            [176, 200, 89]
        ];
    const sunset = [
            [71, 39, 63], 
            [168, 84, 111], 
            [219, 130, 66],
            [93, 82, 33], 
            [160, 166, 78]
        ];
    const windowDay = [
        [247, 243, 223],
        [255, 255, 255],
        [245, 237, 209]
    ];
    const windowNight = [
        [110, 110, 108],
        [151, 164, 168],
        [83, 82, 78]
    ];
    const lightOn =  "247, 242, 228, 0.7";
    const textDay = [[120, 70, 41]];
    const textNight = [[255, 255, 255]];
    const textSunrise =[[147, 91, 171]];
    const textSunset =[[176, 234, 244]];

    let phaseSky, phaseWindow;

    if ( x >= -(radius * 3 / 4) && x <= (radius * 3 / 4)) {
        if (y >= 0) {
            backgroundColor = dayTime;
            windowColor = windowDay;
            textColor = textDay;
        } else {
            backgroundColor = nightTime;
            windowColor = windowNight;
            lightBulb = lightOn;
            textColor = textNight;
        }  
    } else if (x > (radius * 3 / 4)) {
        // Sunrise
        if (y >= 0) {
            phaseSky = (4 / radius) * x - 3;
            phaseWindow = 0.025 * x - 1.5;
            backgroundColor = changeColor(dayTime, sunrise, phaseSky);
            windowColor = changeColor(windowDay, windowNight, phaseWindow);
            textColor = changeColor(textDay, textSunrise, phaseSky);
        } else {
            phaseSky = -(4 / radius) * x + 4;
            phaseWindow = -0.025 * x + 2.5;
            backgroundColor = changeColor(sunrise, nightTime, phaseSky);
            windowColor = changeColor(windowDay, windowNight, phaseWindow);
            lightBulb = lightOn;
            textColor = changeColor(textSunrise, textNight, phaseSky);
        }
        

    } else if (x < -(radius * 3 / 4)) {
        // Sunset
        if (y >= 0) {
            phaseSky = (4 / radius) * x + 4;
            phaseWindow = 0.025 * x + 2.5;
            backgroundColor = changeColor(sunset, dayTime, phaseSky);
            windowColor = changeColor(windowNight, windowDay, phaseWindow);
            textColor = changeColor(textSunset, textDay, phaseSky);
        } else {
            phaseSky = -(4 / radius) * x - 3;
            phaseWindow = -0.025 * x - 1.5;
            backgroundColor = changeColor(nightTime, sunset, phaseSky);
            windowColor = changeColor(windowNight, windowDay, phaseWindow);
            lightBulb = lightOn;
            textColor = changeColor(textNight, textSunset, phaseSky);
        }
    }  

    for (let i in backgroundColor) {
        let r, g, b;
        for (let j in backgroundColor[i]) {
            r = backgroundColor[i][0];
            g = backgroundColor[i][1];
            b = backgroundColor[i][2];
        }
        document.documentElement.style.setProperty(`--color${i}`, `rgb(${r}, ${g}, ${b})`)
    }

    for (let i in windowColor) {
        let r, g, b;
        for (let j in windowColor[i]) {
            r = windowColor[i][0];
            g = windowColor[i][1];
            b = windowColor[i][2];
        }
        document.documentElement.style.setProperty(`--windowColor${i}`, `rgb(${r}, ${g}, ${b})`)
    }

    document.documentElement.style.setProperty(`--light`, `rgb(${lightBulb})`);

    for (let i in textColor) {
        let r, g, b;
        for (let j in textColor[i]) {
            r = textColor[i][0];
            g = textColor[i][1];
            b = textColor[i][2];
        }
        document.documentElement.style.setProperty(`--aboutColor`, `rgb(${r}, ${g}, ${b})`)
    }
}

