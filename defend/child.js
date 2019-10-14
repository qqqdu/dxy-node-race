let i = 0
setInterval(() => {
  i++
  // 这里的不可抗力总让child崩溃
  if(i === 5) {
    console.log(mother.fucker)
  }
  console.log(i)
}, 1000)