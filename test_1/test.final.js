
function setPoint(a,b,points){
    if(!points[`${a}:${b}`] && !points[`${b}:${a}`]){
        points[`${a}:${b}`] = 1;
        points["count"] = points["count"] + 1;
    }
    return points;
}

function findElements(A, B, p1, p2, N){
    if(p1 === p2) return 0;
    if(p1 > N || p2 > N) return 0;
    if(p1 <= 0 || p2 <= 0) return 0;

    let points = {count:0};

    for(let i = 0;i<A.length;i++){
        let eA = A[i];
        let eB = B[i];

        if(eA > N || eB > N) continue;
        if(eB <= 0 || eB <= 0) continue;

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

        res = findElements(A, B, A[i], B[i], N);
        let tempMax = res.count;
        if(max < tempMax){
            max = tempMax;
        }
    }
    return max;
}