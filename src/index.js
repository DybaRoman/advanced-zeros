module.exports = function getZerosCount(number, base) {
//next function is the sieve of Eratosfen
  function sieve(upper_bound){
    let grains = [0, 0];
    for (let i = 2; i <= upper_bound; i++)
      grains.push(i);
    for (let i = 2; i < Math.sqrt(upper_bound); i++)
      for (let j = i*i; j <= upper_bound; j+=i)
        if (grains[j] != 0) grains[j] = 0;
    return grains.filter(function(x) {return x != 0});
  }

//next function find prime factorization of base (array of couples: prime and its degree)
  function factorization(base_number_system, prime_numbers) {
  let prime_dividers = [];
  for (let i = 0; prime_numbers[i] <= base; i++) {
    let p = prime_numbers[i], count = 0;
    while ((base_number_system >= prime_numbers[i]) && (base_number_system % prime_numbers[i] == 0)) {
      base_number_system = base_number_system / prime_numbers[i];
      p = prime_numbers[i];  
      count++;
    }
    if (count)
      prime_dividers.push([p, count]);
    }
  return prime_dividers;
  }

// Next function find how many zeros in the end of number, which is factorial of `number` in `prime_base` base system
  function getZerosForPrimeBase(number, prime_base) {
    let zeros = 0;
    for (let i = 1; Math.pow(prime_base, i) <= number; i++)
      zeros += Math.floor(number / Math.pow(prime_base, i));
    return zeros;
  }

//let's do it
//first, we seek prime numbers
prime_numbers_before_base = sieve(base);

//second, we add number of zeros to our array of couples and get array of trios: [prime, its degree, zeros]
  candidates = factorization(base, prime_numbers_before_base);
  for (let i = 0; i < candidates.length; i++) 
    candidates[i].push(getZerosForPrimeBase(number, candidates[i][0]));

//and finally, we will chose THE ONE (just believe me, Neo)
  neo = candidates.reduce(function(x, y) {return ((x[2] / x[1]) < (y[2] / y[1]))?x:y;});
  return Math.floor(neo[2] / neo[1]);
} 