const quickSort:Function=function(nums:Array<Number>){
    const _nums:Array<Number>=[...nums];
    if(_nums.length<=1)
        return _nums;
    const fn:Function=function(numbers){
        if(numbers.length<=1){
            return numbers;
        }
        let flag=numbers[numbers.length-1];
        let prev=numbers.filter(v=>v<flag);
        let after=numbers.filter(v=>v>=flag);
        return [...quickSort(prev),flag,...quickSort(after)]
    }
    return fn(_nums);
}

console.log(quickSort([1,2,3,5,5,4,4,7,6]));