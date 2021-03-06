/**
 An infrastructure consisting of N cities, numbered from 1 to N, and M bidirectional roads between them is given. Roads do not intersect apart from at their start and end points (they can pass through underground tunnels to avoid collisions).
 For each pair of cities directly connected by a road, let's de ne their network rank as the total number of roads that are connected to either of the two cities. Write a function:
 function solution(A, B, N);
 that, given two arrays A, B consisting of M integers each and an integer N, where A[i] and B[i] are cities at the two ends of the i-th road, returns the maximal network rank in the whole infrastructure.
 Examples:
 1. Given A = [1, 2, 3, 3], B = [2, 3, 1, 4] and N = 4, the function should return 4. The chosen cities may be 2 and 3, and the four roads connected to them are: (2, 1), (2, 3), (3, 1), (3, 4).
 In the pictures below, the chosen cities and roads connected to them are marked in red.
 2. Given A = [1, 2, 4, 5], B = [2, 3, 5, 6] and N = 6, the function should return 2. The chosen cities may be 1 and 2, and the two roads connected to them are: (1, 2), (2, 3).
 Write an e cient algorithm for the following assumptions:
 N is an integer within the range [2..100];
 M is an integer within the range [1..4,950];
 each element of arrays A, B is an integer within the range [1..N]; A and B have equal length;
 each road connects two distinct cities;
 two cities are connected by at most one direct road.
 */

function print(A, B, value = null){
    console.log(`----A-[${A}]-----`)
    console.log(`----B-[${B}]-----`)
    if(value !== null){
        console.log(`result: ${value}`);
    }
    console.log("---------------")
}


function getTestArrs(n){
    let arr = [];
    for (let i=0;i<n;i++){
        let r = Math.floor(Math.random() * n) + 1
        arr.push(r);
    }
    return arr;
}

function doTest(f){
    return (A, B, N) => {
        let time = Date.now();
        print(A,B);
        let res = f(A,B,N);
        print(A,B,res);
        console.log("time:", (Date.now() - time));
        return res;
    }
}

function setPoint(a,b,points){
    if(!points[`${a}:${b}`] && !points[`${b}:${a}`]){
        points[`${a}:${b}`] = 1;
        points["count"] = points["count"] + 1;
    }
    return points;
}

function findElements(A, B, p1, p2){
    if(p1 === p2) return 0;

    let points = {count:0};

    for(let i = 0;i<A.length;i++){
        let eA = A[i];
        let eB = B[i];
        if(eA === p1 || eA === p2){
            points = setPoint(eA, B[i], points)
        }
        if(eB === p1 || eB === p2){
            points = setPoint(eB, A[i], points);
        }
    }
    return points;
}

function solution(A,B,N){
    let aLen = A.length;
    let bLen = B.length;
    if(aLen !== bLen){
        return 0;
    }
    let max = 0;
    let res;
    let maxRes;
    for(let i = 0;i<aLen;i++){
        res = findElements(A, B, A[i], B[i]);
        let tempMax = res.count;
        if(max < tempMax){
            max = tempMax;
            maxRes = res;
        }
    }
    return max;
}

let A = [1,2,3,3];
let B = [2,3,1,4];
let n = 4;
let res = 0;
let findCount = doTest(solution);

res = findCount(A, B, n)

A = [1,2,4,5];
B = [2,3,5,6]
n = 6;
findCount(A, B, n)


A = [1,3,1,3];
B = [3,1,3,1];
// A = [1,2]
// B = [2,1]
// n = 12;
// A = getTestArrs(n)
// B = getTestArrs(n)
findCount(A, B, 3)
