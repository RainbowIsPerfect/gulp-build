const generateTheString = (n) => n % 2 === 0 ? "a".repeat(n - 1) + "b" : "a".repeat(n);
console.log(generateTheString(4));
