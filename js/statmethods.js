/**
 * This file contains all the statistics methods that 
 * we need for the proper calculation of probabilities
 * etc.
 */

/**
 * Calculates the chance of being a certain value in the provided
 * normal curve descrbied by the mean and the standard deviation
 * @param {Number} val 
 * @param {Number} mean 
 * @param {Number} sd 
 */
function getChance(val, mean, sd) {
    //Calculate the z-index
    let z = getZ(val, mean, sd);
    //Then look up that z-index in the probability
    return getProbability(z);
}

/**
 * Returns the z-index for the provided val on the provided
 * normal curve
 * @param {Number} val 
 * @param {Number} mean 
 * @param {Number} sd 
 */
function getZ(val, mean, sd) {
    return (val - mean) / sd;
}

/**
 * Retuns the provided probability for a given z-value
 * @param {Number} zVal 
 */
function getProbability(zVal) {
    //Swap around, to make it easier to look stuff up
    if (zVal < 0) zVal = -zVal;
    //If the zVal is too large, it is unlikely to be the case, chance of 0%;
    if (zVal > 3.4) return 0;
    //Convert the zValue into a string
    let zString = zVal.toString();
    let thirdChar = zString.length > 3 ? zString.charAt(3) : "0";
    let secondChar = zString.length > 2 ? zString.charAt(2) : "0";
    let firstChar = zString.length > 0 ? zString.charAt(0) : "0";
    //Now turn into index numbers that can be used to get a value from the table
    let highIndex = parseInt(firstChar + secondChar);
    let lowIndex = parseInt(thirdChar);
    let maxLength = probabilities[lowIndex].length;
    //Get the value from the table
    return probabilities[lowIndex][maxLength - highIndex - 1];
}

/**
 * Returns where you are on the normal height distribution for the
 * average Dutch citizen. Provide height IN CENTIMETERS
 * @param {Integer} gender either MALE or FEMALE
 * @param {Number} height a floating point number representing your height. IN CENTIMETERS
 */
function getHeightDistribution(gender, height){
    //Get the mean height for your gender
    let mean = (gender === MALE) ? 183.8 : 170.7;
    //Get the standard deviation for your gender
    let sd  = (gender === MALE) ? 7.1 : 6.3;
    //Now ask for the probability to be on that curve
    let prob = getChance(height, mean, sd);
    //Check if we are below or above average
    if(height < mean){
        return {smaller: prob, taller: 1 - prob};
    }else{
        return {smaller: 1 - prob, taller: prob};
    }
}

/**
 * Calculates BMI index for a given height and weight.
 * @param {Number} height   in centimeters 
 * @param {Number} weight   in kilograms
 */
function getBMI(height, weight){
    //Turn height in centimeters into height in meters
    height *= 0.01;
    //Now return the value
    return weight / (height * height);
}

//Use of constants to prevent having to type gender
const MALE = 0;
//Use of constants to prevent having to type gender
const FEMALE = 1;

/**
 * z-index table
 */
const probabilities = [[.0003, .0005, .0007, .0010, .0013, .0019, .0026, .0035, .0047, .0062, .0082, .0107, .0139, .0179, .0228, .0287, .0359, .0446, .0548, .0668, .0808, .0968, .1151, .1357, .1587, .1841, .2119, .2420, .2743, .3085, .3446, .3821, .4207, .4602, .5000,],[.0003, .0005, .0007, .0009, .0013, .0018, .0025, .0034, .0045, .0060, .0080, .0104, .0136, .0174, .0222, .0281, .0351, .0436, .0537, .0655, .0793, .0951, .1131, .1335, .1562, .1814, .2090, .2389, .2709, .3050, .3409, .3783, .4168, .4562, .4960,], [.0003, .0005, .0006, .0009, .0013, .0018, .0024, .0033, .0044, .0059, .0078, .0102, .0132, .0170, .0217, .0274, .0344, .0427, .0526, .0643, .0778, .0934, .1112, .1314, .1539, .1788, .2061, .2358, .2676, .3015, .3372, .3745, .4129, .4522, .4920,], [.0003, .0004, .0006, .0009, .0012, .0017, .0023, .0032, .0043, .0057, .0075, .0099, .0129, .0166, .0212, .0268, .0336, .0418, .0516, .0630, .0764, .0918, .1093, .1292, .1515, .1762, .2033, .2327, .2643, .2981, .3336, .3707, .4090, .4483, .4880,], [.0003, .0004, .0006, .0008, .0012, .0016, .0023, .0031, .0041, .0055, .0073, .0096, .0125, .0162, .0207, .0262, .0329, .0409, .0505, .0618, .0749, .0901, .1075, .1271, .1492, .1736, .2005, .2296, .2611, .2946, .3300, .3669, .4052, .4443, .4840,], [.0003, .0004, .0006, .0008, .0011, .0016, .0022, .0030, .0040, .0054, .0071, .0094, .0122, .0158, .0202, .0256, .0322, .0401, .0495, .0606, .0735, .0885, .1056, .1251, .1469, .1711, .1977, .2266, .2578, .2912, .3264, .3632, .4013, .4404, .4801,], [.0003, .0004, .0006, .0008, .0011, .0015, .0021, .0029, .0039, .0052, .0069, .0091, .0119, .0154, .0197, .0250, .0314, .0392, .0485, .0594, .0721, .0869, .1038, .1230, .1446, .1685, .1949, .2236, .2546, .2877, .3228, .3594, .3974, .4364, .4761,], [.0003, .0004, .0005, .0008, .0011, .0015, .0021, .0028, .0038, .0051, .0068, .0089, .0116, .0150, .0192, .0244, .0307, .0384, .0475, .0582, .0708, .0853, .1020, .1210, .1423, .1660, .1922, .2206, .2514, .2843, .3192, .3557, .3936, .4325, .4721,], [.0003, .0004, .0005, .0007, .0010, .0014, .0020, .0027, .0037, .0049, .0066, .0087, .0113, .0146, .0188, .0239, .0301, .0375, .0465, .0571, .0694, .0838, .1003, .1190, .1401, .1635, .1894, .2177, .2483, .2810, .3156, .3520, .3897, .4286, .4681,], [.0002, .0003, .0005, .0007, .0010, .0014, .0019, .0026, .0036, .0048, .0064, .0084, .0110, .0143, .0183, .0233, .0294, .0367, .0455, .0559, .0681, .0823, .0985, .1170, .1379, .1611, .1867, .2148, .2451, .2776, .3121, .3483, .3859, .4247, .4641]];