export interface NodeContent {
  definition: string;
  formula: string | null;
  parameters: string[] | null;
  intuition: string;
  common_confusion: string | null;
  example_use: string;
}

export const NODE_CONTENT: Record<string, NodeContent> = {
  "random_variables": {
    "definition": "A random variable is a function that assigns a numerical value to each outcome of a random experiment, providing a way to quantify uncertainty.",
    "formula": null,
    "parameters": null,
    "intuition": "Think of a random variable as a rule that converts unpredictable outcomes (like a die roll) into numbers you can do math with.",
    "common_confusion": "A random variable is not itself random — it is a fixed function. The randomness comes from the underlying experiment.",
    "example_use": "Let X be the number of heads in 10 coin flips; X is a random variable taking values 0 through 10."
  },
  "discrete_random_variables": {
    "definition": "A random variable whose possible values form a finite or countably infinite set.",
    "formula": null,
    "parameters": null,
    "intuition": "Discrete means you can list all possible values — like counts of events.",
    "common_confusion": "Discrete does not require a finite number of values; the Poisson distribution takes infinitely many discrete values (0, 1, 2, ...).",
    "example_use": "The number of defective items in a batch of 100 is a discrete random variable."
  },
  "probability_mass_function": {
    "definition": "A function p(x) that gives the probability that a discrete random variable X takes exactly the value x, satisfying p(x) ≥ 0 and Σ p(x) = 1.",
    "formula": "p(x) = P(X = x)",
    "parameters": null,
    "intuition": "The PMF tells you how the total probability of 1 is spread across all possible discrete outcomes.",
    "common_confusion": "PMF applies only to discrete random variables. For continuous variables, use the probability density function (PDF) instead.",
    "example_use": "For a fair die, p(x) = 1/6 for x ∈ {1, 2, 3, 4, 5, 6}."
  },
  "continuous_random_variables": {
    "definition": "A random variable that can take any value in an interval of the real line, with probability assigned to ranges rather than individual points.",
    "formula": null,
    "parameters": null,
    "intuition": "Continuous means the possible values form a smooth range — like a temperature measurement that could be any real number.",
    "common_confusion": "For a continuous random variable, P(X = x) = 0 for any single value x. Probability only makes sense over intervals.",
    "example_use": "The exact height of a randomly selected person is a continuous random variable."
  },
  "probability_density_function": {
    "definition": "A non-negative function f(x) such that the probability of X falling in [a, b] is the integral of f over that interval, with total integral equal to 1.",
    "formula": "P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx,  ∫₋∞^∞ f(x) dx = 1",
    "parameters": null,
    "intuition": "The PDF is like a height map — taller regions have more probability density, meaning outcomes there are more likely.",
    "common_confusion": "f(x) is not a probability. It can exceed 1. Only integrals of f give probabilities.",
    "example_use": "The normal PDF f(x) = (1/σ√2π) exp(-(x-μ)²/2σ²) describes the bell curve."
  },
  "distribution_functions": {
    "definition": "The family of functions that describe how probability is distributed over the possible values of a random variable.",
    "formula": null,
    "parameters": null,
    "intuition": "Distribution functions are the complete specification of a random variable's probabilistic behavior.",
    "common_confusion": null,
    "example_use": "Specifying that X ~ N(0,1) fully determines its distribution function."
  },
  "cumulative_distribution_function": {
    "definition": "The function F(x) = P(X ≤ x), giving the probability that the random variable takes a value less than or equal to x.",
    "formula": "F(x) = P(X ≤ x) = ∫₋∞ˣ f(t) dt",
    "parameters": null,
    "intuition": "The CDF accumulates probability from left to right. It always starts near 0 and increases to 1.",
    "common_confusion": "The CDF is defined for both discrete and continuous random variables. For discrete variables it is a step function.",
    "example_use": "F(1.96) ≈ 0.975 for the standard normal tells us 97.5% of values fall below 1.96."
  },
  "joint_distributions": {
    "definition": "A distribution that describes the simultaneous probabilistic behavior of two or more random variables.",
    "formula": null,
    "parameters": null,
    "intuition": "A joint distribution captures not just how each variable behaves alone, but how they relate to each other.",
    "common_confusion": "Knowing both marginal distributions is not enough to recover the joint distribution without additional information about dependence.",
    "example_use": "The joint distribution of height and weight in a population describes how they co-vary."
  },
  "joint_probability_mass_function": {
    "definition": "A function p(x, y) = P(X = x, Y = y) giving the probability that two discrete random variables simultaneously take specific values.",
    "formula": "p(x, y) = P(X = x, Y = y),  ΣΣ p(x,y) = 1",
    "parameters": null,
    "intuition": "The joint PMF is a table of probabilities for every combination of outcomes of X and Y.",
    "common_confusion": null,
    "example_use": "Rolling two dice: p(x, y) = 1/36 for each (x, y) pair where x, y ∈ {1,...,6}."
  },
  "joint_probability_density_function": {
    "definition": "A non-negative function f(x, y) such that probabilities over regions are given by double integrals, with total integral equal to 1.",
    "formula": "P((X,Y) ∈ A) = ∬_A f(x,y) dx dy",
    "parameters": null,
    "intuition": "The joint PDF is a surface over the (x, y) plane — higher surface values mean that combination of values is more probable.",
    "common_confusion": null,
    "example_use": "The bivariate normal distribution has a joint PDF forming an elliptical bell shape."
  },
  "marginal_distribution": {
    "definition": "The distribution of a single variable obtained from a joint distribution by summing (discrete) or integrating (continuous) over the other variables.",
    "formula": "p_X(x) = Σ_y p(x,y)  or  f_X(x) = ∫ f(x,y) dy",
    "parameters": null,
    "intuition": "Marginalizing means averaging out the variables you don't care about, leaving only the one you do.",
    "common_confusion": "The marginal distribution of X tells you nothing about how X and Y are related — it discards all dependence information.",
    "example_use": "From the joint height-weight distribution, integrating out weight gives the marginal distribution of height."
  },
  "functions_of_random_variables": {
    "definition": "If X is a random variable and g is a function, then Y = g(X) is also a random variable whose distribution is derived from X's distribution.",
    "formula": null,
    "parameters": null,
    "intuition": "Transforming a random variable creates a new random variable — and its distribution can be derived from the original.",
    "common_confusion": null,
    "example_use": "If X ~ N(0,1) then X² ~ χ²(1)."
  },
  "linear_combination_of_random_variables": {
    "definition": "A random variable of the form Y = a₁X₁ + a₂X₂ + ... + aₙXₙ where the aᵢ are constants.",
    "formula": "E[Y] = Σ aᵢ E[Xᵢ],  Var(Y) = Σᵢ Σⱼ aᵢ aⱼ Cov(Xᵢ, Xⱼ)",
    "parameters": null,
    "intuition": "Linear combinations are the building blocks of statistics — means, totals, and contrasts are all linear combinations.",
    "common_confusion": "The variance formula requires covariance terms unless the variables are independent.",
    "example_use": "The sample mean X̄ = (X₁ + ... + Xₙ)/n is a linear combination with all aᵢ = 1/n."
  },
  "distribution_of_sum_of_independent_random_variables": {
    "definition": "The distribution of X + Y when X and Y are independent, obtained via convolution of their individual distributions.",
    "formula": "f_{X+Y}(z) = ∫ f_X(x) f_Y(z-x) dx",
    "parameters": null,
    "intuition": "Adding independent random variables convolves their distributions — the result is generally more spread out and, by CLT, more normal.",
    "common_confusion": "Independence is essential. The sum of dependent variables requires knowledge of the joint distribution.",
    "example_use": "The sum of n independent N(μ, σ²) variables follows N(nμ, nσ²)."
  },
  "convolution_of_probability_density_functions": {
    "definition": "The mathematical operation that yields the PDF of the sum of two independent continuous random variables.",
    "formula": "(f * g)(z) = ∫₋∞^∞ f(x) g(z-x) dx",
    "parameters": null,
    "intuition": "Convolution slides one distribution over another, computing how much overlap occurs at each position.",
    "common_confusion": null,
    "example_use": "Convolving two uniform(0,1) densities gives the triangular distribution on (0,2)."
  },
  "conditional_probability_and_conditional_distributions": {
    "definition": "The framework for updating probabilities or distributions given partial information about the outcome.",
    "formula": null,
    "parameters": null,
    "intuition": "Conditioning means restricting your view to a subset of possibilities — recalculating probabilities given what you know.",
    "common_confusion": null,
    "example_use": "Given a positive test result, the conditional probability of having a disease is updated via Bayes' theorem."
  },
  "conditional_probability": {
    "definition": "The probability of event A given that event B has occurred, defined as P(A|B) = P(A ∩ B) / P(B).",
    "formula": "P(A|B) = P(A ∩ B) / P(B),  P(B) > 0",
    "parameters": null,
    "intuition": "Conditioning on B restricts the sample space to outcomes where B occurred, then re-normalizes.",
    "common_confusion": "P(A|B) ≠ P(B|A) in general. Confusing these is the base-rate fallacy.",
    "example_use": "P(rain tomorrow | cloudy today) updates tomorrow's rain probability given today's weather."
  },
  "chain_rule_for_probabilities": {
    "definition": "The rule that expresses the joint probability of multiple events as a product of conditional probabilities.",
    "formula": "P(A₁ ∩ A₂ ∩ ... ∩ Aₙ) = P(A₁) P(A₂|A₁) P(A₃|A₁,A₂) ⋯ P(Aₙ|A₁,...,Aₙ₋₁)",
    "parameters": null,
    "intuition": "Break a complex joint probability into a sequence of simpler conditional probabilities, each conditioning on everything before.",
    "common_confusion": null,
    "example_use": "P(A,B,C) = P(A) · P(B|A) · P(C|A,B)"
  },
  "conditional_distribution": {
    "definition": "The distribution of random variable X given that Y = y, obtained by fixing Y and renormalizing the joint distribution.",
    "formula": "f_{X|Y}(x|y) = f(x,y) / f_Y(y)",
    "parameters": null,
    "intuition": "Slice the joint distribution at a fixed value of Y — the conditional distribution is that slice, rescaled to integrate to 1.",
    "common_confusion": "The conditional distribution of X|Y=y is a full distribution over X, not just a single number.",
    "example_use": "In a bivariate normal, X|Y=y is itself normal with mean and variance depending on y."
  },
  "conditional_expectation": {
    "definition": "The expected value of a random variable X given information about another variable Y, denoted E[X|Y].",
    "formula": "E[X|Y=y] = ∫ x f_{X|Y}(x|y) dx",
    "parameters": null,
    "intuition": "Conditional expectation updates your best guess of X after learning Y — it is itself a random variable (a function of Y).",
    "common_confusion": "E[X|Y] is a random variable (it varies with Y), while E[X] is a constant.",
    "example_use": "E[salary | years of experience] gives the average salary for a given experience level."
  },
  "independence_structure": {
    "definition": "The collection of independence relationships among random variables in a probability model.",
    "formula": null,
    "parameters": null,
    "intuition": "Independence structure describes which variables carry information about each other and which do not.",
    "common_confusion": null,
    "example_use": "In an IID sample, all observations are independent — knowing one tells you nothing about another."
  },
  "independent_random_variables": {
    "definition": "Random variables X and Y are independent if knowing the value of one gives no information about the other: f(x,y) = f_X(x) f_Y(y).",
    "formula": "P(X ∈ A, Y ∈ B) = P(X ∈ A) · P(Y ∈ B)",
    "parameters": null,
    "intuition": "Independence means the joint distribution factors — the variables have no relationship whatsoever.",
    "common_confusion": "Uncorrelated does not imply independent. Zero correlation only rules out linear dependence.",
    "example_use": "Two separate coin flips are independent random variables."
  },
  "independent_identically_distributed_random_variables": {
    "definition": "A sequence of random variables that are mutually independent and each follows the same probability distribution.",
    "formula": null,
    "parameters": null,
    "intuition": "IID means each observation is a fresh, unrelated draw from the same population — the foundation of most classical statistics.",
    "common_confusion": "IID is a strong assumption. Time series data, clustered data, and repeated measures all violate independence.",
    "example_use": "A random sample of n measurements from a population is modeled as IID."
  },
  "mutual_independence": {
    "definition": "A collection of random variables X₁, ..., Xₙ is mutually independent if any subcollection is independent — the joint distribution factors completely.",
    "formula": "P(X₁ ∈ A₁, ..., Xₙ ∈ Aₙ) = ∏ᵢ P(Xᵢ ∈ Aᵢ)",
    "parameters": null,
    "intuition": "Mutual independence is stronger than pairwise independence — every subset of variables must be independent of every other subset.",
    "common_confusion": "Pairwise independence does not imply mutual independence.",
    "example_use": "The components of an IID random sample are mutually independent."
  },
  "expectation_and_moments": {
    "definition": "The family of summary statistics that describe the location, spread, and shape of a distribution through weighted averages of powers of the random variable.",
    "formula": null,
    "parameters": null,
    "intuition": "Moments compress an entire distribution into a few numbers — mean captures location, variance captures spread.",
    "common_confusion": null,
    "example_use": "The first four moments (mean, variance, skewness, kurtosis) give a fairly complete picture of a distribution."
  },
  "expected_value": {
    "definition": "The probability-weighted average of all possible values of a random variable, representing its long-run average outcome.",
    "formula": "E[X] = Σ x p(x)  or  E[X] = ∫ x f(x) dx",
    "parameters": null,
    "intuition": "The expected value is the center of gravity of the distribution — where it would balance if placed on a scale.",
    "common_confusion": "The expected value need not be a possible value of X. E[die roll] = 3.5, which you can never actually roll.",
    "example_use": "E[X] = np for a Binomial(n, p) random variable."
  },
  "variance": {
    "definition": "The expected squared deviation from the mean, measuring how spread out the distribution is around its center.",
    "formula": "Var(X) = E[(X - μ)²] = E[X²] - (E[X])²",
    "parameters": null,
    "intuition": "Variance measures average squared distance from the mean — larger variance means the distribution is more spread out.",
    "common_confusion": "Variance is in squared units. Take the square root to get standard deviation, which is in the same units as X.",
    "example_use": "Var(X) = np(1-p) for a Binomial(n, p) random variable."
  },
  "covariance": {
    "definition": "A measure of the linear co-movement between two random variables, defined as the expected product of their deviations from their means.",
    "formula": "Cov(X,Y) = E[(X - μ_X)(Y - μ_Y)] = E[XY] - E[X]E[Y]",
    "parameters": null,
    "intuition": "Positive covariance means the variables tend to move together; negative means they move in opposite directions.",
    "common_confusion": "Covariance is scale-dependent. Dividing by the product of standard deviations gives the correlation, which is scale-free.",
    "example_use": "Cov(X, X) = Var(X)."
  },
  "correlation": {
    "definition": "The standardized covariance between two random variables, always in [-1, 1], measuring the strength and direction of their linear relationship.",
    "formula": "ρ(X,Y) = Cov(X,Y) / (σ_X σ_Y)",
    "parameters": [
      "ρ: correlation coefficient, ρ ∈ [-1, 1]"
    ],
    "intuition": "Correlation of ±1 means a perfect linear relationship; 0 means no linear relationship (but possibly nonlinear dependence).",
    "common_confusion": "Correlation measures only linear association. Two variables can be strongly dependent with correlation 0.",
    "example_use": "A correlation of 0.8 between study hours and exam score suggests a strong positive linear relationship."
  },
  "limit_laws": {
    "definition": "Theorems describing the behavior of functions of random variables as the sample size grows to infinity.",
    "formula": null,
    "parameters": null,
    "intuition": "Limit laws tell us that with enough data, randomness averages out in predictable ways.",
    "common_confusion": null,
    "example_use": "The LLN and CLT together justify using sample means to estimate population means."
  },
  "weak_law_of_large_numbers": {
    "definition": "For IID random variables with finite mean μ, the sample mean X̄ₙ converges in probability to μ as n → ∞.",
    "formula": "P(|X̄ₙ - μ| > ε) → 0  as  n → ∞,  for all ε > 0",
    "parameters": null,
    "intuition": "With more data, the sample average becomes an increasingly reliable estimate of the true mean.",
    "common_confusion": "The LLN says the average converges, not individual observations. Individual draws remain random no matter how large n gets.",
    "example_use": "A casino's average profit per game converges to the house edge as the number of games grows."
  },
  "central_limit_theorem": {
    "definition": "For IID random variables with mean μ and variance σ², the standardized sample mean converges in distribution to the standard normal as n → ∞.",
    "formula": "√n (X̄ₙ - μ) / σ →_d N(0, 1)",
    "parameters": null,
    "intuition": "Sums of many small independent random influences — regardless of their individual distributions — tend to follow a normal distribution.",
    "common_confusion": "The CLT applies to the distribution of the sample mean, not individual observations. Individual draws keep their original distribution.",
    "example_use": "Even if individual insurance claims are skewed, the average claim over thousands of policies is approximately normal."
  },
  "probability_inequalities": {
    "definition": "Bounds on probabilities that hold without knowledge of the exact distribution, derived from moment information alone.",
    "formula": null,
    "parameters": null,
    "intuition": "Probability inequalities trade precision for generality — they work for any distribution satisfying simple conditions.",
    "common_confusion": null,
    "example_use": "Chebyshev's inequality provides a conservative but universally valid confidence bound."
  },
  "chebyshev_inequality": {
    "definition": "For any random variable with mean μ and variance σ², the probability of deviating from the mean by more than k standard deviations is at most 1/k².",
    "formula": "P(|X - μ| ≥ kσ) ≤ 1/k²",
    "parameters": [
      "k: number of standard deviations (k > 0)"
    ],
    "intuition": "At least 75% of values lie within 2 standard deviations of the mean, for any distribution — a universal guarantee.",
    "common_confusion": "Chebyshev bounds are often very loose for specific distributions like the normal, where the actual tail probability is much smaller.",
    "example_use": "With k=3, at least 88.9% of any distribution lies within 3 standard deviations of the mean."
  },
  "exponential_family": {
    "definition": "A broad class of distributions whose PDF/PMF can be written in the form h(x) exp(η(θ)·T(x) - A(θ)), unifying many common distributions under one framework.",
    "formula": "f(x|θ) = h(x) exp(η(θ)·T(x) - A(θ))",
    "parameters": [
      "η(θ): natural parameter",
      "T(x): sufficient statistic",
      "A(θ): log-partition function (normalizing constant)",
      "h(x): base measure"
    ],
    "intuition": "The exponential family is the 'right' family for statistical modeling — it has sufficient statistics, conjugate priors, and connects naturally to GLMs.",
    "common_confusion": "Not all distributions belong to the exponential family. The uniform distribution U(0,θ) and Cauchy distribution do not.",
    "example_use": "Normal, Bernoulli, Poisson, Binomial, Gamma, and Beta all belong to the exponential family."
  },
  "bernoulli_distribution": {
    "definition": "The distribution of a single binary trial with probability p of success, taking values 0 (failure) or 1 (success).",
    "formula": "P(X = x) = p^x (1-p)^(1-x),  x ∈ {0, 1}",
    "parameters": [
      "p: probability of success, p ∈ (0,1)"
    ],
    "intuition": "The Bernoulli is the simplest possible distribution — a single weighted coin flip.",
    "common_confusion": "The Bernoulli is a special case of Binomial(1, p). The Binomial counts successes over n trials.",
    "example_use": "Whether a single email is spam (1) or not (0) follows a Bernoulli distribution."
  },
  "binomial_distribution": {
    "definition": "The distribution of the number of successes in n independent Bernoulli trials each with success probability p.",
    "formula": "P(X = k) = C(n,k) p^k (1-p)^(n-k),  k = 0, 1, ..., n",
    "parameters": [
      "n: number of trials (positive integer)",
      "p: success probability, p ∈ (0,1)"
    ],
    "intuition": "Count how many times an event occurs in a fixed number of independent tries — that count follows a Binomial.",
    "common_confusion": "Requires independence between trials. If sampling without replacement from a small population, use the Hypergeometric instead.",
    "example_use": "The number of heads in 20 coin flips follows Binomial(20, 0.5)."
  },
  "geometric_distribution": {
    "definition": "The distribution of the number of Bernoulli trials needed to get the first success, or equivalently the number of failures before the first success.",
    "formula": "P(X = k) = (1-p)^(k-1) p,  k = 1, 2, 3, ...",
    "parameters": [
      "p: success probability per trial"
    ],
    "intuition": "The Geometric counts how long you wait for the first success — it is the discrete analogue of the Exponential distribution.",
    "common_confusion": "Two conventions exist: counting the trial of first success (starting at 1) vs. counting failures before first success (starting at 0). Check which is being used.",
    "example_use": "The number of job applications until the first offer follows a Geometric distribution."
  },
  "poisson_distribution": {
    "definition": "The distribution of the number of events occurring in a fixed interval when events happen at a constant average rate and independently of each other.",
    "formula": "P(X = k) = e^(-λ) λ^k / k!,  k = 0, 1, 2, ...",
    "parameters": [
      "λ: average rate (events per interval), λ > 0"
    ],
    "intuition": "The Poisson models rare events in continuous time or space — customer arrivals, radioactive decay, typos per page.",
    "common_confusion": "The Poisson assumes events are independent and the rate is constant. Clustering or time-varying rates violate these assumptions.",
    "example_use": "If a call center receives 10 calls per hour on average, the number per hour follows Poisson(10)."
  },
  "trinomial_distribution": {
    "definition": "The distribution of counts in three categories for n independent trials, each resulting in category 1, 2, or 3 with probabilities p₁, p₂, p₃.",
    "formula": "P(X₁=k₁, X₂=k₂, X₃=k₃) = n!/(k₁!k₂!k₃!) p₁^k₁ p₂^k₂ p₃^k₃",
    "parameters": [
      "n: number of trials",
      "p₁, p₂, p₃: category probabilities (sum to 1)"
    ],
    "intuition": "The Trinomial is the three-category version of the Binomial, itself a special case of the Multinomial.",
    "common_confusion": null,
    "example_use": "Classifying n voters as Democrat, Republican, or Independent follows a Trinomial distribution."
  },
  "uniform_distribution": {
    "definition": "The distribution that assigns equal probability density to all values in an interval [a, b].",
    "formula": "f(x) = 1/(b-a)  for  x ∈ [a,b],  else 0",
    "parameters": [
      "a: lower bound",
      "b: upper bound (b > a)"
    ],
    "intuition": "All outcomes in the interval are equally likely — the distribution of 'complete ignorance' about a bounded quantity.",
    "common_confusion": "The discrete uniform and continuous uniform are different distributions. The continuous uniform is not a member of the exponential family.",
    "example_use": "A random number generator producing values in [0, 1] follows Uniform(0, 1)."
  },
  "normal_distribution": {
    "definition": "A continuous symmetric bell-shaped distribution fully characterized by its mean μ and variance σ², arising naturally as the limit of sums of independent random variables.",
    "formula": "f(x) = (1 / σ√2π) exp(-(x-μ)² / 2σ²)",
    "parameters": [
      "μ: mean (location)",
      "σ²: variance (spread), σ > 0"
    ],
    "intuition": "The normal distribution is the universal shape of averages. By the CLT, means of large samples are approximately normal regardless of the original distribution.",
    "common_confusion": "Real data is never exactly normal. The normal distribution is a useful approximation, not a fact about the world.",
    "example_use": "Measurement errors, standardized test scores, and OLS residuals are commonly modeled as normal."
  },
  "students_t_distribution": {
    "definition": "A symmetric bell-shaped distribution with heavier tails than the normal, arising when estimating the mean of a normal population with unknown variance from a small sample.",
    "formula": "f(t) ∝ (1 + t²/ν)^(-(ν+1)/2)",
    "parameters": [
      "ν: degrees of freedom (ν > 0); heavier tails for smaller ν"
    ],
    "intuition": "When σ² is unknown and estimated from data, there is extra uncertainty — the t-distribution accounts for this by having fatter tails than the normal.",
    "common_confusion": "As ν → ∞, the t-distribution converges to the standard normal. For ν > 30, the difference is negligible in practice.",
    "example_use": "The one-sample t-test statistic (x̄ - μ₀)/(s/√n) follows a t(n-1) distribution under H₀."
  },
  "chi_square_distribution": {
    "definition": "The distribution of the sum of squares of ν independent standard normal random variables.",
    "formula": "If Z₁,...,Zᵥ ~iid N(0,1), then X = Z₁² + ... + Zᵥ² ~ χ²(ν)",
    "parameters": [
      "ν: degrees of freedom (positive integer)"
    ],
    "intuition": "The chi-square distribution naturally arises whenever you sum squared normal quantities — sample variances, goodness-of-fit statistics.",
    "common_confusion": "The chi-square distribution is right-skewed and only takes non-negative values. It is not symmetric like the normal.",
    "example_use": "The test statistic (n-1)S²/σ² follows χ²(n-1) when sampling from a normal population."
  },
  "f_distribution": {
    "definition": "The distribution of the ratio of two independent chi-square random variables, each divided by their degrees of freedom.",
    "formula": "If U ~ χ²(d₁) and V ~ χ²(d₂) independently, then F = (U/d₁)/(V/d₂) ~ F(d₁, d₂)",
    "parameters": [
      "d₁: numerator degrees of freedom",
      "d₂: denominator degrees of freedom"
    ],
    "intuition": "The F-distribution compares two variances — it is the natural distribution for ANOVA and regression F-tests.",
    "common_confusion": "The F-distribution is right-skewed and only takes positive values. An F-statistic less than 1 suggests the numerator variance is smaller.",
    "example_use": "The ANOVA F-statistic for testing equality of group means follows an F distribution under H₀."
  },
  "gamma_distribution": {
    "definition": "A flexible two-parameter family for positive continuous variables, generalizing the Exponential and chi-square distributions.",
    "formula": "f(x) = x^(α-1) e^(-x/β) / (β^α Γ(α)),  x > 0",
    "parameters": [
      "α: shape parameter (α > 0)",
      "β: scale parameter (β > 0)",
      "Mean = αβ,  Variance = αβ²"
    ],
    "intuition": "The Gamma models waiting times until the α-th event in a Poisson process — it is the continuous analogue of the Negative Binomial.",
    "common_confusion": "The Exponential distribution is Gamma(1, β). The chi-square with ν df is Gamma(ν/2, 2).",
    "example_use": "Insurance claim sizes and precipitation amounts are often modeled with the Gamma distribution."
  },
  "exponential_distribution": {
    "definition": "The distribution of waiting times between events in a Poisson process, characterized by the memoryless property.",
    "formula": "f(x) = λ e^(-λx),  x > 0",
    "parameters": [
      "λ: rate parameter (λ > 0); mean = 1/λ"
    ],
    "intuition": "The Exponential is the only continuous memoryless distribution — past waiting time gives no information about future waiting time.",
    "common_confusion": "Memorylessness is a very strong assumption. Most real lifetimes and wait times do not satisfy it.",
    "example_use": "Time between customer arrivals in a Poisson process follows an Exponential distribution."
  },
  "beta_distribution": {
    "definition": "A flexible distribution on [0, 1] used to model probabilities, proportions, and other bounded quantities.",
    "formula": "f(x) = x^(α-1)(1-x)^(β-1) / B(α,β),  x ∈ (0,1)",
    "parameters": [
      "α: shape parameter (α > 0)",
      "β: shape parameter (β > 0)",
      "Mean = α/(α+β)"
    ],
    "intuition": "The Beta is the natural distribution for a probability — it lives on [0,1] and can be symmetric, skewed, U-shaped, or uniform.",
    "common_confusion": "Beta(1,1) is the Uniform(0,1). The Beta is the conjugate prior for the Bernoulli/Binomial likelihood.",
    "example_use": "In Bayesian analysis, the Beta distribution is used as a prior for an unknown probability p."
  },
  "bernoulli_type_distributions": {
    "definition": "The family of distributions built from binary (success/failure) Bernoulli trials, including the Bernoulli, Binomial, and Geometric.",
    "formula": null,
    "parameters": null,
    "intuition": "All Bernoulli-type distributions model processes built from repeated binary outcomes.",
    "common_confusion": null,
    "example_use": "Modeling the number of successes in repeated independent trials uses Bernoulli-type distributions."
  },
  "poisson_type_distributions": {
    "definition": "The family of distributions related to Poisson processes, modeling counts of events occurring at a constant rate.",
    "formula": null,
    "parameters": null,
    "intuition": "Poisson-type distributions describe how many events happen in a given period when events are rare and independent.",
    "common_confusion": null,
    "example_use": "Count data in ecology, epidemiology, and queuing theory often follows Poisson-type distributions."
  },
  "multinomial_type_distributions": {
    "definition": "Distributions generalizing the Binomial to three or more categories, including the Trinomial and Multinomial.",
    "formula": null,
    "parameters": null,
    "intuition": "When each trial can result in one of k > 2 categories, the joint count distribution is Multinomial-type.",
    "common_confusion": null,
    "example_use": "Modeling the distribution of votes across multiple political parties uses a Multinomial distribution."
  },
  "normal_based_distributions": {
    "definition": "The family of distributions derived from the normal distribution, including the t, chi-square, and F distributions.",
    "formula": null,
    "parameters": null,
    "intuition": "When you square, sum, or ratio normal random variables, you get distributions from this family — the basis of classical inference.",
    "common_confusion": null,
    "example_use": "Classical hypothesis tests for means and variances all rely on normal-based sampling distributions."
  },
  "gamma_based_distributions": {
    "definition": "The family of distributions related to the Gamma, including the Exponential and Beta, all sharing the Gamma function in their normalizing constants.",
    "formula": null,
    "parameters": null,
    "intuition": "Gamma-based distributions model positive continuous quantities and arise naturally in Bayesian conjugate analysis.",
    "common_confusion": null,
    "example_use": "Bayesian inference for Poisson rates uses a Gamma prior, producing a Gamma posterior."
  },
  "discrete_distributions": {
    "definition": "The class of probability distributions over countable outcome spaces, where probabilities are assigned to individual values.",
    "formula": null,
    "parameters": null,
    "intuition": "Discrete distributions model count data and categorical outcomes where values are enumerable.",
    "common_confusion": null,
    "example_use": "The number of errors in a document, number of arrivals per hour, and binary outcomes are all modeled with discrete distributions."
  },
  "continuous_distributions": {
    "definition": "The class of probability distributions over uncountable outcome spaces, where probability is assigned to intervals via a density function.",
    "formula": null,
    "parameters": null,
    "intuition": "Continuous distributions model measurements that can take any value in a range, like height, temperature, or time.",
    "common_confusion": null,
    "example_use": "Physical measurements, financial returns, and regression errors are typically modeled with continuous distributions."
  },
  "distribution_families": {
    "definition": "Collections of related probability distributions grouped by their mathematical form or the types of phenomena they model.",
    "formula": null,
    "parameters": null,
    "intuition": "Distribution families organize the space of distributions into meaningful clusters — knowing a family tells you what kinds of data it is suited for.",
    "common_confusion": null,
    "example_use": "The exponential family unifies normal, Poisson, Binomial, and Gamma under a single mathematical framework."
  },
  "foundations_of_inference": {
    "definition": "The branch of statistics concerned with drawing conclusions about population parameters from sample data, quantifying uncertainty in those conclusions.",
    "formula": null,
    "parameters": null,
    "intuition": "Statistical inference is the formal machinery for learning from data under uncertainty — turning observations into principled statements about the world.",
    "common_confusion": null,
    "example_use": "Estimating the population mean income from a survey sample and constructing a confidence interval around that estimate."
  },
  "frequentist_inference": {
    "definition": "A framework for statistical inference that interprets probability as long-run frequency and evaluates procedures by their repeated-sampling behavior.",
    "formula": null,
    "parameters": null,
    "intuition": "Frequentist methods ask: if we repeated this experiment many times, how would our procedure perform on average?",
    "common_confusion": "Frequentist confidence intervals do not mean 'the parameter is in this interval with 95% probability' — the parameter is fixed, not random.",
    "example_use": "A 95% confidence interval procedure covers the true parameter in 95% of repeated samples."
  },
  "parameter": {
    "definition": "A numerical characteristic of a population or probability model, typically unknown and to be estimated from data.",
    "formula": null,
    "parameters": null,
    "intuition": "Parameters are the unknowns that define a model — estimating them is the central task of statistical inference.",
    "common_confusion": "Parameters describe populations; statistics describe samples. The sample mean is a statistic that estimates the population mean parameter.",
    "example_use": "The mean μ and variance σ² of a normal distribution are its parameters."
  },
  "parameter_space": {
    "definition": "The set of all possible values a parameter can take, defining the scope of the statistical model.",
    "formula": null,
    "parameters": null,
    "intuition": "The parameter space constrains what models are considered — for example, a variance must be positive, so σ² ∈ (0, ∞).",
    "common_confusion": null,
    "example_use": "For a Binomial model, the parameter space is p ∈ (0, 1)."
  },
  "continuous_parameter": {
    "definition": "A parameter that can take any value in a continuous range, such as a mean, variance, or regression coefficient.",
    "formula": null,
    "parameters": null,
    "intuition": "Most statistical parameters are continuous — they live on the real line or a continuous subset of it.",
    "common_confusion": null,
    "example_use": "The regression slope β ∈ ℝ is a continuous parameter."
  },
  "discrete_parameter": {
    "definition": "A parameter that can only take values from a discrete set, such as the number of mixture components or the degrees of freedom.",
    "formula": null,
    "parameters": null,
    "intuition": "Discrete parameters arise when the model structure itself is unknown — selecting the number of clusters is a discrete parameter problem.",
    "common_confusion": null,
    "example_use": "The number of components k in a Gaussian mixture model is a discrete parameter."
  },
  "population_mean": {
    "definition": "The average of a numerical variable across all members of a population, denoted μ.",
    "formula": "μ = (1/N) Σᵢ xᵢ  (finite population)",
    "parameters": null,
    "intuition": "The population mean is the true center of the distribution — what the sample mean tries to estimate.",
    "common_confusion": "The population mean is a fixed unknown constant. The sample mean X̄ is a random variable that estimates it.",
    "example_use": "The mean height of all adults in a country is a population parameter estimated from a sample survey."
  },
  "population_variance": {
    "definition": "The average squared deviation of a variable from its population mean, measuring the spread of the entire population.",
    "formula": "σ² = (1/N) Σᵢ (xᵢ - μ)²",
    "parameters": null,
    "intuition": "Population variance quantifies how spread out the true distribution is — the sample variance S² estimates it.",
    "common_confusion": "The sample variance divides by n-1 (not n) to be an unbiased estimator of σ².",
    "example_use": "The variance of exam scores across all students in a school is a population parameter."
  },
  "population_proportion": {
    "definition": "The fraction of a population with a particular characteristic, denoted p.",
    "formula": "p = (number with characteristic) / N",
    "parameters": null,
    "intuition": "Population proportion is the true probability of a binary outcome in the population.",
    "common_confusion": null,
    "example_use": "The proportion of voters supporting a candidate in an election is estimated from a poll."
  },
  "independent_random_samples": {
    "definition": "A sample of n observations drawn independently from the same population, forming the basis of most classical statistical methods.",
    "formula": null,
    "parameters": null,
    "intuition": "Independent random sampling ensures each observation carries fresh, unrelated information about the population.",
    "common_confusion": "In practice, sampling without replacement from a finite population introduces weak dependence. If the population is large relative to the sample, this is negligible.",
    "example_use": "Drawing 100 voters at random from a voter registry yields an independent random sample."
  },
  "empirical_distribution": {
    "definition": "The distribution that places equal probability mass 1/n on each of the n observed data points, serving as a nonparametric estimate of the population distribution.",
    "formula": "F̂_n(x) = (1/n) Σᵢ 1(Xᵢ ≤ x)",
    "parameters": null,
    "intuition": "The empirical distribution is the simplest possible estimate of the true distribution — just treat the data as the population.",
    "common_confusion": null,
    "example_use": "The bootstrap method samples from the empirical distribution to approximate sampling distributions."
  },
  "sample_mean": {
    "definition": "The arithmetic average of n observed values, X̄ = (1/n)Σ Xᵢ, used as an estimator of the population mean μ.",
    "formula": "X̄ = (1/n) Σᵢ₌₁ⁿ Xᵢ",
    "parameters": null,
    "intuition": "The sample mean is the most natural estimator of center — unbiased, consistent, and asymptotically normal by the CLT.",
    "common_confusion": "The sample mean is a random variable with its own distribution (the sampling distribution). It is not the same as μ.",
    "example_use": "The average of 50 measurements estimates the true mean of the measurement process."
  },
  "sample_variance": {
    "definition": "The average squared deviation from the sample mean, computed with divisor n-1 to produce an unbiased estimator of σ².",
    "formula": "S² = (1/(n-1)) Σᵢ (Xᵢ - X̄)²",
    "parameters": null,
    "intuition": "Dividing by n-1 instead of n corrects for the fact that deviations are measured from the estimated mean X̄, not the true mean μ.",
    "common_confusion": "Dividing by n gives the MLE of σ² (biased). Dividing by n-1 gives the unbiased estimator. The difference matters most for small n.",
    "example_use": "S² estimates the variability of measurements in an experiment."
  },
  "sample_standard_deviation": {
    "definition": "The square root of the sample variance, S = √S², providing a spread measure in the same units as the data.",
    "formula": "S = √[(1/(n-1)) Σᵢ (Xᵢ - X̄)²]",
    "parameters": null,
    "intuition": "Standard deviation is variance expressed in the original units — easier to interpret and compare to the mean.",
    "common_confusion": "S is not an unbiased estimator of σ even though S² is unbiased for σ². Jensen's inequality ensures E[S] < σ.",
    "example_use": "A standard deviation of 5 cm in height measurements tells us most values are within ~5 cm of the mean."
  },
  "sample_covariance": {
    "definition": "The sample analog of covariance, measuring the linear co-movement between two variables in a dataset.",
    "formula": "S_XY = (1/(n-1)) Σᵢ (Xᵢ - X̄)(Yᵢ - Ȳ)",
    "parameters": null,
    "intuition": "Sample covariance estimates how two variables tend to move together in the data.",
    "common_confusion": null,
    "example_use": "The sample covariance between height and weight is positive, indicating taller people tend to weigh more."
  },
  "sample_proportion": {
    "definition": "The fraction of sample observations with a particular characteristic, p̂ = k/n, used to estimate the population proportion p.",
    "formula": "p̂ = k/n",
    "parameters": null,
    "intuition": "The sample proportion is an unbiased, consistent estimator of the population proportion.",
    "common_confusion": null,
    "example_use": "If 42 of 100 surveyed voters support a candidate, p̂ = 0.42 estimates the true support level."
  },
  "sampling_distributions": {
    "definition": "The probability distribution of a statistic (like X̄ or S²) over all possible samples of size n from the population.",
    "formula": null,
    "parameters": null,
    "intuition": "A sampling distribution describes how much a statistic would vary if we repeatedly drew new samples — it quantifies estimator uncertainty.",
    "common_confusion": "The sampling distribution is not the distribution of the data. It is the distribution of a summary statistic computed from the data.",
    "example_use": "The sampling distribution of X̄ is N(μ, σ²/n) when sampling from a normal population."
  },
  "sampling_distribution": {
    "definition": "The distribution of a specific statistic computed from repeated random samples of the same size from the same population.",
    "formula": null,
    "parameters": null,
    "intuition": "If you drew thousands of samples and computed X̄ each time, the histogram of those X̄ values would approximate its sampling distribution.",
    "common_confusion": null,
    "example_use": "The sampling distribution of the sample mean has standard error σ/√n."
  },
  "standard_error": {
    "definition": "The standard deviation of a statistic's sampling distribution, measuring the typical variability of the statistic across samples.",
    "formula": "SE(X̄) = σ/√n  (estimated as S/√n when σ unknown)",
    "parameters": null,
    "intuition": "Standard error tells you how precisely the statistic estimates its target — smaller SE means more reliable estimates.",
    "common_confusion": "Standard error is the standard deviation of the estimator, not of the data. Confusing the two leads to wrong confidence intervals.",
    "example_use": "With n=100 and S=10, the standard error of X̄ is 10/√100 = 1."
  },
  "bootstrapped_sampling_distribution": {
    "definition": "An approximation to the sampling distribution of a statistic obtained by repeatedly resampling with replacement from the observed data.",
    "formula": null,
    "parameters": null,
    "intuition": "The bootstrap pretends the empirical distribution is the true population and simulates what sampling variability would look like.",
    "common_confusion": "The bootstrap approximates the sampling distribution of a statistic, not the population distribution of the data.",
    "example_use": "Bootstrap the median to get a confidence interval when the analytical sampling distribution is unknown."
  },
  "large_sample_inference": {
    "definition": "Inference methods that rely on asymptotic approximations (typically the CLT or MLE theory) that become valid as sample size grows.",
    "formula": null,
    "parameters": null,
    "intuition": "Large-sample methods trade exact results for generality — they work for almost any distribution when n is large enough.",
    "common_confusion": "How large n needs to be depends on the problem. For heavy-tailed distributions, n may need to be very large for the CLT approximation to be adequate.",
    "example_use": "Wald confidence intervals for MLE estimates rely on large-sample normality of the MLE."
  },
  "large_sample_distribution_of_the_mle": {
    "definition": "Under regularity conditions, the MLE θ̂ is asymptotically normal: √n(θ̂ - θ₀) →_d N(0, I(θ₀)⁻¹) where I(θ₀) is the Fisher information.",
    "formula": "√n(θ̂ - θ₀) →_d N(0, [I(θ₀)]⁻¹)",
    "parameters": null,
    "intuition": "MLEs are approximately normal for large samples — this justifies Wald confidence intervals and z-tests for any parametric model.",
    "common_confusion": "This is an asymptotic result. For small samples, the MLE may be far from normal, especially for skewed or bounded parameters.",
    "example_use": "The asymptotic normality of the logistic regression MLE justifies z-tests for regression coefficients."
  },
  "normal_approximation": {
    "definition": "The use of the normal distribution to approximate the distribution of a statistic, justified by the Central Limit Theorem.",
    "formula": null,
    "parameters": null,
    "intuition": "When n is large, the normal approximation converts difficult probability calculations into simple z-score lookups.",
    "common_confusion": "The normal approximation can be poor for small samples, rare events, or heavily skewed distributions.",
    "example_use": "Approximating the Binomial(n, p) distribution by N(np, np(1-p)) for large n."
  },
  "point_estimation": {
    "definition": "The use of a single value (a statistic) to estimate an unknown population parameter.",
    "formula": null,
    "parameters": null,
    "intuition": "Point estimation boils down all the data to a single best guess for the unknown parameter.",
    "common_confusion": "A point estimate ignores uncertainty. Always pair a point estimate with a measure of precision (SE, CI).",
    "example_use": "The sample mean X̄ = 4.7 is a point estimate of the population mean μ."
  },
  "estimator": {
    "definition": "A function of the sample data used to estimate an unknown parameter; a rule that maps data to an estimate.",
    "formula": null,
    "parameters": null,
    "intuition": "An estimator is a recipe — plug in data, get out an estimate. The estimator itself is a random variable with its own distribution.",
    "common_confusion": "An estimator is a function (random variable); an estimate is its realized value for a specific dataset.",
    "example_use": "T(X₁,...,Xₙ) = X̄ is an estimator of μ; T(3,5,4,6) = 4.5 is an estimate."
  },
  "unbiased_estimator": {
    "definition": "An estimator whose expected value equals the true parameter value: E[T(X)] = θ for all θ.",
    "formula": "E[T(X)] = θ",
    "parameters": null,
    "intuition": "An unbiased estimator is correct on average — it neither systematically overshoots nor undershoots the true value.",
    "common_confusion": "Unbiasedness is a desirable but not sufficient property. A biased estimator with lower variance may have smaller mean squared error.",
    "example_use": "The sample mean X̄ is an unbiased estimator of μ. The sample variance S² is unbiased for σ²."
  },
  "bias": {
    "definition": "The systematic difference between the expected value of an estimator and the true parameter: Bias(T) = E[T(X)] - θ.",
    "formula": "Bias(T) = E[T(X)] - θ",
    "parameters": null,
    "intuition": "Bias measures the estimator's tendency to consistently over- or under-estimate the true value.",
    "common_confusion": "MSE = Variance + Bias². Reducing bias can increase variance (the bias-variance trade-off).",
    "example_use": "The MLE of σ² divides by n (not n-1), giving a negative bias of -σ²/n."
  },
  "consistency": {
    "definition": "An estimator Tₙ is consistent if it converges in probability to the true parameter as n → ∞: Tₙ →_p θ.",
    "formula": "P(|Tₙ - θ| > ε) → 0  as  n → ∞",
    "parameters": null,
    "intuition": "Consistency means more data guarantees a better estimate — in the limit, you recover the truth exactly.",
    "common_confusion": "Consistency is a large-sample property. An estimator can be consistent but have large bias or variance for finite n.",
    "example_use": "The sample mean is consistent for μ by the Law of Large Numbers."
  },
  "estimate": {
    "definition": "The specific numerical value produced by applying an estimator to an observed dataset.",
    "formula": null,
    "parameters": null,
    "intuition": "An estimate is the output of the estimation recipe applied to your actual data — a single number.",
    "common_confusion": null,
    "example_use": "Applying the sample mean estimator to {3, 5, 4, 6} gives the estimate 4.5."
  },
  "bias_corrected_estimate": {
    "definition": "An estimate adjusted to remove the known bias of an estimator: T* = T - Bias(T).",
    "formula": "T* = T - B̂ias(T)",
    "parameters": null,
    "intuition": "If you know your estimator is systematically off, subtract the bias to get a corrected value.",
    "common_confusion": "Bias correction increases variance. The corrected estimator may have higher MSE despite being unbiased.",
    "example_use": "The bootstrap bias-corrected estimate subtracts the estimated bootstrap bias from the original estimate."
  },
  "interval_estimation": {
    "definition": "Estimation that produces a range of plausible values for a parameter rather than a single point, quantifying uncertainty.",
    "formula": null,
    "parameters": null,
    "intuition": "Interval estimates acknowledge that a single number cannot fully capture parameter uncertainty — a range is more honest.",
    "common_confusion": null,
    "example_use": "Reporting a 95% confidence interval (3.2, 5.8) rather than just the point estimate 4.5."
  },
  "confidence_interval": {
    "definition": "An interval [L(X), U(X)] constructed from sample data such that the procedure covers the true parameter with probability 1-α across repeated samples.",
    "formula": "P(L(X) ≤ θ ≤ U(X)) = 1 - α",
    "parameters": [
      "1-α: confidence level (typically 0.90, 0.95, or 0.99)"
    ],
    "intuition": "A 95% CI is a random interval that traps the true parameter in 95% of repeated experiments — not a 95% probability statement about this particular interval.",
    "common_confusion": "A 95% CI does NOT mean 'there is a 95% probability the parameter is in this interval.' The parameter is fixed; the interval is random.",
    "example_use": "A 95% CI for μ: X̄ ± 1.96 σ/√n when σ is known and the population is normal."
  },
  "confidence_level": {
    "definition": "The probability 1-α that the confidence interval procedure captures the true parameter value over repeated samples.",
    "formula": "1 - α  (common values: 0.90, 0.95, 0.99)",
    "parameters": [
      "α: significance level"
    ],
    "intuition": "Higher confidence level means wider intervals — there is a direct trade-off between precision and reliability.",
    "common_confusion": "Confidence level is a property of the procedure, not of any single computed interval.",
    "example_use": "A 99% CI is wider than a 95% CI for the same data, reflecting higher guaranteed coverage."
  },
  "large_sample_confidence_interval": {
    "definition": "A confidence interval constructed using the normal approximation to the sampling distribution of the statistic, valid for large n.",
    "formula": "estimate ± z_{α/2} · SE",
    "parameters": [
      "z_{α/2}: critical value from N(0,1), e.g. 1.96 for 95% CI"
    ],
    "intuition": "When n is large, the CLT guarantees approximate normality, making z-based intervals valid for any distribution.",
    "common_confusion": "The large-sample CI is approximate, not exact. For small samples, use t-intervals or exact methods.",
    "example_use": "X̄ ± 1.96 S/√n is a large-sample 95% CI for μ."
  },
  "t_confidence_interval": {
    "definition": "A confidence interval for a normal population mean using the t-distribution when σ² is unknown, especially appropriate for small samples.",
    "formula": "X̄ ± t_{α/2, n-1} · S/√n",
    "parameters": [
      "t_{α/2, n-1}: critical value from t-distribution with n-1 degrees of freedom"
    ],
    "intuition": "The t-interval replaces the z critical value with a larger t critical value to account for the extra uncertainty from estimating σ.",
    "common_confusion": "The t-CI assumes normality of the population. For large n, the t and z critical values are nearly identical.",
    "example_use": "For n=15 and 95% confidence: X̄ ± 2.145 S/√15."
  },
  "confidence_interval_for_difference_of_means": {
    "definition": "A confidence interval for μ₁ - μ₂, the difference between two population means, constructed from two independent samples.",
    "formula": "(X̄₁ - X̄₂) ± t_{α/2} · SE(X̄₁ - X̄₂)",
    "parameters": null,
    "intuition": "Comparing two groups requires an interval for their difference — if it excludes 0, the means are significantly different.",
    "common_confusion": "The pooled vs. unpooled standard error choice depends on whether equal variances can be assumed.",
    "example_use": "Constructing a 95% CI for the difference in mean blood pressure between a treatment and control group."
  },
  "confidence_interval_for_population_variance": {
    "definition": "A confidence interval for σ² based on the chi-square distribution of (n-1)S²/σ².",
    "formula": "[(n-1)S²/χ²_{α/2}, (n-1)S²/χ²_{1-α/2}]",
    "parameters": null,
    "intuition": "Unlike CI for the mean, the CI for variance is asymmetric because the chi-square distribution is right-skewed.",
    "common_confusion": "This interval assumes the population is exactly normal. It is not robust to departures from normality.",
    "example_use": "A 95% CI for the variance of a manufacturing process to check if it meets specifications."
  },
  "large_sample_confidence_interval_using_mle": {
    "definition": "A confidence interval derived from the asymptotic normality of the MLE: θ̂ ± z_{α/2} / √(nI(θ̂)).",
    "formula": "θ̂ ± z_{α/2} · √(I(θ̂)⁻¹/n)",
    "parameters": null,
    "intuition": "MLE theory provides standard errors for free — the Fisher information gives the asymptotic variance.",
    "common_confusion": null,
    "example_use": "Confidence intervals for logistic regression coefficients use the MLE asymptotic normality result."
  },
  "wald_confidence_interval": {
    "definition": "A confidence interval of the form θ̂ ± z_{α/2} · SE(θ̂), based on the normal approximation to the distribution of the MLE.",
    "formula": "θ̂ ± z_{α/2} · SE(θ̂)",
    "parameters": null,
    "intuition": "The Wald interval is the simplest and most widely used form of CI — estimate plus or minus a multiple of its standard error.",
    "common_confusion": "Wald intervals can have poor coverage for proportions near 0 or 1, or for small samples. The Wilson interval performs better in those cases.",
    "example_use": "A Wald 95% CI for a proportion: p̂ ± 1.96 √(p̂(1-p̂)/n)."
  },
  "likelihood": {
    "definition": "The likelihood of parameter θ given observed data x is L(θ; x) = f(x; θ), the data density evaluated at the observed data as a function of θ.",
    "formula": "L(θ; x) = f(x; θ) = ∏ᵢ f(xᵢ; θ)  (IID case)",
    "parameters": null,
    "intuition": "The likelihood measures how probable the observed data would be under different parameter values — higher likelihood means the data is more consistent with that parameter.",
    "common_confusion": "The likelihood is not a probability distribution over θ. It is a function of θ for fixed observed data x.",
    "example_use": "For n Bernoulli observations with k successes: L(p; k) = p^k (1-p)^(n-k)."
  },
  "log_likelihood": {
    "definition": "The natural logarithm of the likelihood function, ℓ(θ) = log L(θ; x), used because it converts products to sums and is easier to maximize.",
    "formula": "ℓ(θ) = log L(θ; x) = Σᵢ log f(xᵢ; θ)",
    "parameters": null,
    "intuition": "Taking the log makes the math tractable — products become sums, and the logarithm is monotone so it doesn't change where the maximum is.",
    "common_confusion": null,
    "example_use": "For normal data: ℓ(μ, σ²) = -n/2 log(2πσ²) - Σ(xᵢ-μ)²/(2σ²)."
  },
  "maximum_likelihood_estimation": {
    "definition": "A method of estimating parameters by finding the value θ̂ that maximizes the likelihood (or equivalently the log-likelihood) of the observed data.",
    "formula": "θ̂_MLE = argmax_θ L(θ; x) = argmax_θ ℓ(θ; x)",
    "parameters": null,
    "intuition": "MLE finds the parameter value that makes the observed data most probable — the best explanation for what was seen.",
    "common_confusion": "MLE maximizes the likelihood of the data given θ, not the probability of θ given the data. That is Bayesian posterior maximization.",
    "example_use": "The MLE of μ for normal data is X̄; the MLE of p for Binomial data is k/n."
  },
  "maximum_likelihood_estimator": {
    "definition": "The specific estimator θ̂ that results from applying maximum likelihood estimation to a given parametric model.",
    "formula": "θ̂ = argmax_θ Σᵢ log f(Xᵢ; θ)",
    "parameters": null,
    "intuition": "The MLE is the gold standard for parametric estimation — it is consistent, asymptotically efficient, and invariant under reparameterization.",
    "common_confusion": "The MLE is not always unbiased. For example, the MLE of σ² divides by n, not n-1, giving a biased (but consistent) estimator.",
    "example_use": "In logistic regression, the MLE of β is found by iterative numerical optimization."
  },
  "regularity_conditions": {
    "definition": "Technical conditions on the parametric model (differentiability, identifiability, bounded support, etc.) required for MLE asymptotic theory to hold.",
    "formula": null,
    "parameters": null,
    "intuition": "Regularity conditions are the fine print of MLE theory — they ensure the log-likelihood is well-behaved enough for asymptotic normality to apply.",
    "common_confusion": "Common violations include: uniform distribution (support depends on parameter), or a model with non-differentiable likelihood.",
    "example_use": "The Uniform(0, θ) model violates regularity conditions — its MLE θ̂ = X_(n) is not asymptotically normal."
  },
  "numerical_maximization_methods": {
    "definition": "Iterative algorithms for finding the maximum of the log-likelihood when a closed-form solution does not exist.",
    "formula": null,
    "parameters": null,
    "intuition": "Most likelihoods in real models cannot be maximized analytically — numerical methods climb the log-likelihood surface iteratively.",
    "common_confusion": null,
    "example_use": "Logistic regression, mixed models, and neural networks all require numerical optimization to find the MLE."
  },
  "newton_raphson_method": {
    "definition": "An iterative algorithm for finding the maximum of the log-likelihood using first and second derivatives: θ_{t+1} = θ_t - [ℓ''(θ_t)]⁻¹ ℓ'(θ_t).",
    "formula": "θ_{t+1} = θ_t - [ℓ''(θ_t)]⁻¹ ℓ'(θ_t)",
    "parameters": null,
    "intuition": "Newton-Raphson uses local curvature information to take smarter steps toward the maximum than simple gradient ascent.",
    "common_confusion": "Newton-Raphson can diverge or converge to a local maximum. It requires the log-likelihood to be concave near the solution.",
    "example_use": "Used in IRLS (Iteratively Reweighted Least Squares) to fit GLMs including logistic regression."
  },
  "bisection_method": {
    "definition": "A root-finding algorithm that repeatedly halves an interval until the score function (likelihood derivative) equals zero.",
    "formula": null,
    "parameters": null,
    "intuition": "Bisection is slower than Newton-Raphson but guaranteed to converge for one-dimensional problems with a sign change.",
    "common_confusion": null,
    "example_use": "Finding the MLE of an exponential family parameter when Newton-Raphson is numerically unstable."
  },
  "fisher_information": {
    "definition": "A measure of the amount of information that observable data carries about an unknown parameter, equal to the variance of the score function.",
    "formula": "I(θ) = E[(∂/∂θ log f(X;θ))²] = -E[∂²/∂θ² log f(X;θ)]",
    "parameters": null,
    "intuition": "High Fisher information means the data is very informative about θ — the likelihood is sharply peaked around the true value.",
    "common_confusion": "Fisher information is about the data's informativeness, not the parameter's uncertainty. These are related but distinct concepts.",
    "example_use": "The asymptotic variance of the MLE is 1/(nI(θ)) — more information means a more precise estimate."
  },
  "expected_fisher_information": {
    "definition": "The Fisher information computed as the expected value of the squared score, taken over the data distribution.",
    "formula": "I(θ) = E_θ[(∂/∂θ log f(X;θ))²]",
    "parameters": null,
    "intuition": "Expected Fisher information averages over all possible datasets — it is a property of the model at a given θ, not of the observed data.",
    "common_confusion": null,
    "example_use": "The expected Fisher information for a Bernoulli(p) model is 1/(p(1-p))."
  },
  "observed_fisher_information": {
    "definition": "The Fisher information evaluated at the MLE using the observed data: J(θ̂) = -ℓ''(θ̂), the negative curvature of the log-likelihood at the maximum.",
    "formula": "J(θ̂) = -∂²ℓ(θ)/∂θ²|_{θ=θ̂}",
    "parameters": null,
    "intuition": "Observed Fisher information uses the actual data rather than expectations — it gives the curvature of the likelihood at the MLE.",
    "common_confusion": "Expected and observed Fisher information agree asymptotically but differ in finite samples. Observed information is more commonly used for standard errors.",
    "example_use": "The standard error of the MLE is approximately 1/√J(θ̂)."
  },
  "score_function": {
    "definition": "The derivative of the log-likelihood with respect to θ, equal to zero at the MLE: s(θ) = ∂ℓ(θ)/∂θ.",
    "formula": "s(θ) = ∂/∂θ log L(θ; x) = Σᵢ ∂/∂θ log f(xᵢ; θ)",
    "parameters": null,
    "intuition": "The score function measures how much the log-likelihood increases as you move the parameter — it is zero at the maximum.",
    "common_confusion": "The score has mean zero under the true parameter: E_θ[s(θ)] = 0. This is a key identity used in deriving MLE properties.",
    "example_use": "Setting the score to zero and solving gives the MLE estimating equations."
  },
  "likelihood_ratio": {
    "definition": "The ratio of the likelihood under two different parameter values, used to compare models and construct test statistics.",
    "formula": "Λ = L(θ₀; x) / L(θ̂; x)",
    "parameters": null,
    "intuition": "A likelihood ratio near 1 means both parameter values explain the data equally well; a small ratio means θ₀ is much worse than θ̂.",
    "common_confusion": null,
    "example_use": "The likelihood ratio test statistic is -2 log Λ, which follows a chi-square distribution asymptotically under H₀."
  },
  "method_of_moments": {
    "definition": "A parameter estimation method that equates population moments (functions of θ) to sample moments and solves for θ.",
    "formula": "Set E[Xᵏ] = (1/n)Σ Xᵢᵏ and solve for θ",
    "parameters": null,
    "intuition": "Method of moments says: find the parameter that makes the theoretical mean/variance match what you observed.",
    "common_confusion": "Method of moments estimates are often less efficient than MLE. They are simpler to compute but can be inconsistent if moments don't uniquely identify the distribution.",
    "example_use": "For a Gamma(α, β) distribution, setting theoretical mean and variance equal to sample mean and variance gives MOM estimates."
  },
  "least_squares_estimation": {
    "definition": "A parameter estimation method that minimizes the sum of squared differences between observed values and model predictions.",
    "formula": "β̂ = argmin_β Σᵢ (yᵢ - f(xᵢ; β))²",
    "parameters": null,
    "intuition": "Least squares finds the parameters that make the model's predictions as close as possible to the data, in a squared-error sense.",
    "common_confusion": "OLS is the MLE when errors are normal. For non-normal errors, least squares may not be the most efficient estimator.",
    "example_use": "Fitting a line to data by minimizing the sum of squared vertical distances from the line."
  },
  "bootstrap": {
    "definition": "A resampling method that approximates the sampling distribution of a statistic by repeatedly resampling with replacement from the observed data.",
    "formula": null,
    "parameters": null,
    "intuition": "The bootstrap simulates the act of taking many samples from the population by treating the observed data as a proxy for the population.",
    "common_confusion": "The bootstrap cannot overcome small sample bias or fix a fundamentally flawed study design — it only approximates sampling variability.",
    "example_use": "Use 1000 bootstrap samples to construct a confidence interval for the median when the analytical formula is unknown."
  },
  "non_parametric_bootstrap": {
    "definition": "The standard bootstrap that resamples with replacement directly from the observed data, making no assumptions about the population distribution.",
    "formula": null,
    "parameters": null,
    "intuition": "The non-parametric bootstrap is assumption-free — it lets the data speak for itself without imposing a distributional model.",
    "common_confusion": null,
    "example_use": "Bootstrap the correlation coefficient between two variables to get a confidence interval without assuming bivariate normality."
  },
  "parametric_bootstrap": {
    "definition": "A bootstrap that resamples from a fitted parametric model rather than from the raw data, assuming the model is correctly specified.",
    "formula": null,
    "parameters": null,
    "intuition": "The parametric bootstrap uses the fitted model to simulate data — it can be more efficient than non-parametric if the model is correct.",
    "common_confusion": "If the parametric model is misspecified, the parametric bootstrap can give misleading results.",
    "example_use": "Fit a normal distribution to data, then generate bootstrap samples from N(X̄, S²) to assess estimator variability."
  },
  "bootstrap_percentile_method": {
    "definition": "A bootstrap confidence interval formed by taking the α/2 and 1-α/2 quantiles of the bootstrap distribution of the statistic.",
    "formula": "CI = [θ̂*_{(α/2)}, θ̂*_{(1-α/2)}]",
    "parameters": null,
    "intuition": "Cut off the extreme bootstrap values and use the middle 95% as your confidence interval.",
    "common_confusion": "The percentile method can have poor coverage if the statistic's distribution is skewed. The BCa (bias-corrected accelerated) method improves on this.",
    "example_use": "Sort 1000 bootstrap estimates and take the 25th and 975th values as the 95% CI bounds."
  },
  "bayesian_inference": {
    "definition": "A framework for statistical inference that treats parameters as random variables with prior distributions, updating beliefs to a posterior distribution using observed data via Bayes' theorem.",
    "formula": "p(θ|x) = p(x|θ) p(θ) / p(x)  ∝  p(x|θ) p(θ)",
    "parameters": null,
    "intuition": "Bayesian inference formalizes learning: start with prior beliefs about a parameter, observe data, and update to posterior beliefs.",
    "common_confusion": "Bayesian credible intervals have the intuitive interpretation ('95% probability the parameter is here') that frequentist confidence intervals do not.",
    "example_use": "Given a Beta prior on p and Binomial data, the posterior is also Beta — a conjugate pair."
  },
  "prior_probability": {
    "definition": "A probability distribution over the parameter θ that encodes beliefs about θ before observing any data: p(θ).",
    "formula": null,
    "parameters": null,
    "intuition": "The prior is your starting belief — it can be informative (based on past knowledge) or non-informative (expressing ignorance).",
    "common_confusion": "The choice of prior matters most when data is sparse. With large samples, the likelihood dominates and the posterior is insensitive to the prior.",
    "example_use": "A Beta(2, 2) prior on a probability p expresses a mild belief that p is near 0.5."
  },
  "non_informative_prior": {
    "definition": "A prior distribution that attempts to express minimal prior knowledge, allowing the data to dominate the posterior.",
    "formula": null,
    "parameters": null,
    "intuition": "A non-informative prior tries to 'let the data speak' — it contributes as little information as possible beyond defining the parameter space.",
    "common_confusion": "There is no uniquely 'correct' non-informative prior. Jeffreys priors are invariant to reparameterization, but even these involve choices.",
    "example_use": "A Uniform(0,1) prior on p or a Jeffreys prior p(θ) ∝ √I(θ) are common non-informative choices."
  },
  "posterior_distribution": {
    "definition": "The conditional distribution of the parameter θ given the observed data x, combining prior beliefs and likelihood information.",
    "formula": "p(θ|x) ∝ L(θ; x) · p(θ)",
    "parameters": null,
    "intuition": "The posterior is everything you know about the parameter after seeing the data — it replaces the prior as your updated belief.",
    "common_confusion": "The posterior is a full distribution, not just a point. Point summaries (mean, median, mode) lose uncertainty information.",
    "example_use": "With a Beta(α,β) prior and Binomial(n, p) likelihood with k successes: posterior is Beta(α+k, β+n-k)."
  },
  "posterior_probability": {
    "definition": "A probability computed from the posterior distribution, such as P(θ ∈ A | x) for some set A.",
    "formula": "P(θ ∈ A | x) = ∫_A p(θ|x) dθ",
    "parameters": null,
    "intuition": "Posterior probabilities are direct, interpretable probability statements about the parameter — e.g., 'there is a 92% chance the drug reduces risk.'",
    "common_confusion": null,
    "example_use": "P(p > 0.5 | data) is a posterior probability that a treatment effect exceeds 50%."
  },
  "posterior_mean": {
    "definition": "The expected value of the parameter under the posterior distribution: E[θ|x] = ∫ θ p(θ|x) dθ.",
    "formula": "E[θ|x] = ∫ θ p(θ|x) dθ",
    "parameters": null,
    "intuition": "The posterior mean is the Bayes estimator under squared error loss — the optimal single-number summary of the posterior.",
    "common_confusion": "The posterior mean is not the same as the MLE or the posterior mode (MAP). They coincide only under specific conditions.",
    "example_use": "For Beta(α+k, β+n-k) posterior: E[p|data] = (α+k)/(α+β+n)."
  },
  "posterior_median": {
    "definition": "The value that divides the posterior distribution in half: P(θ ≤ median | x) = 0.5.",
    "formula": null,
    "parameters": null,
    "intuition": "The posterior median is the Bayes estimator under absolute error loss — preferred when the posterior is skewed.",
    "common_confusion": null,
    "example_use": "For skewed posteriors like the Gamma, the median may be preferred over the mean as a point estimate."
  },
  "bayesian_point_estimation": {
    "definition": "The derivation of a single-value estimate of a parameter from the posterior distribution, typically the posterior mean, median, or mode.",
    "formula": null,
    "parameters": null,
    "intuition": "Bayesian point estimation collapses the posterior to a single number — the choice of summary depends on the loss function.",
    "common_confusion": null,
    "example_use": "The posterior mean minimizes expected squared error loss; the posterior median minimizes expected absolute error loss."
  },
  "bayesian_point_estimate": {
    "definition": "The specific numerical value obtained by summarizing the posterior distribution with a point statistic such as the mean, median, or MAP.",
    "formula": null,
    "parameters": null,
    "intuition": "Just as a frequentist produces a point estimate from data, a Bayesian produces a point estimate from the posterior.",
    "common_confusion": null,
    "example_use": "The posterior mean (α+k)/(α+β+n) is a Bayesian point estimate of the Binomial probability p."
  },
  "bayesian_interval_estimation": {
    "definition": "The construction of a credible interval from the posterior distribution, providing a range that contains the parameter with specified posterior probability.",
    "formula": null,
    "parameters": null,
    "intuition": "Bayesian intervals have the direct probabilistic interpretation that frequentist CIs lack — they are regions of high posterior probability.",
    "common_confusion": null,
    "example_use": "A 95% Bayesian credible interval means P(θ ∈ [L, U] | data) = 0.95."
  },
  "credible_interval": {
    "definition": "An interval [L, U] such that the posterior probability of θ lying within it equals the specified level: P(L ≤ θ ≤ U | x) = 1-α.",
    "formula": "P(L ≤ θ ≤ U | x) = 1 - α",
    "parameters": [
      "1-α: credible level (e.g. 0.95)"
    ],
    "intuition": "A 95% credible interval directly says: given the data, we believe there is a 95% probability the parameter is in this range.",
    "common_confusion": "The credible interval and confidence interval are numerically similar in many problems but have fundamentally different interpretations.",
    "example_use": "A 95% credible interval for μ from a normal-normal conjugate model."
  },
  "equal_tail_interval": {
    "definition": "A credible interval formed by cutting equal probability from each tail of the posterior: [F⁻¹(α/2), F⁻¹(1-α/2)].",
    "formula": "[θ_{α/2}, θ_{1-α/2}]  where  P(θ < θ_{α/2}|x) = α/2",
    "parameters": null,
    "intuition": "The equal-tail interval splits the excluded probability evenly between both tails — the natural extension of two-sided frequentist CIs.",
    "common_confusion": "The equal-tail interval is not the shortest possible interval. For skewed posteriors, the HPD interval is shorter.",
    "example_use": "For a symmetric posterior like N(μ, σ²), the equal-tail and HPD intervals coincide."
  },
  "highest_posterior_density_interval": {
    "definition": "The shortest credible interval [L, U] that contains probability 1-α, defined by the property that the posterior density at L and U are equal.",
    "formula": "HPD: {θ : p(θ|x) ≥ c}  for the largest c such that P(θ ∈ HPD|x) ≥ 1-α",
    "parameters": null,
    "intuition": "The HPD is the most concentrated region of the posterior with the required probability — it excludes the lowest-density tails.",
    "common_confusion": "For multimodal posteriors, the HPD may be a disjoint union of intervals.",
    "example_use": "For a skewed posterior, the HPD interval is shorter than the equal-tail interval."
  },
  "equal_tail_credible_interval_method": {
    "definition": "The procedure for constructing an equal-tail credible interval by taking quantiles from the posterior distribution.",
    "formula": null,
    "parameters": null,
    "intuition": "In practice, equal-tail intervals are computed by taking the α/2 and 1-α/2 quantiles of posterior samples.",
    "common_confusion": null,
    "example_use": "Sort 10,000 MCMC posterior samples; the 2.5th and 97.5th percentiles give a 95% equal-tail credible interval."
  },
  "highest_posterior_density_interval_method": {
    "definition": "The procedure for constructing an HPD interval from posterior samples, typically by finding the shortest interval containing the required fraction of samples.",
    "formula": null,
    "parameters": null,
    "intuition": "Slide a window of the required width across sorted posterior samples and find the position where the window is narrowest.",
    "common_confusion": null,
    "example_use": "The HDInterval package in R computes HPD intervals from MCMC samples."
  },
  "hypothesis_testing": {
    "definition": "A formal procedure for deciding between a null hypothesis H₀ and an alternative hypothesis H₁ based on observed data.",
    "formula": null,
    "parameters": null,
    "intuition": "Hypothesis testing formalizes the question 'is this effect real or just noise?' using a decision rule with controlled error rates.",
    "common_confusion": "Failing to reject H₀ is not the same as accepting H₀. Absence of evidence is not evidence of absence.",
    "example_use": "Testing whether a new drug has a different mean effect than placebo using a two-sample t-test."
  },
  "null_hypothesis": {
    "definition": "The default hypothesis H₀ representing 'no effect,' 'no difference,' or a specific parameter value, which is rejected only if evidence is strong enough.",
    "formula": "H₀: θ = θ₀  (or  θ ≤ θ₀,  θ ≥ θ₀)",
    "parameters": null,
    "intuition": "The null hypothesis is the position of skepticism — we assume nothing is happening until the data forces us to conclude otherwise.",
    "common_confusion": "The p-value is P(data this extreme | H₀ is true), not P(H₀ is true | data).",
    "example_use": "H₀: μ = 0 (the treatment has no effect)."
  },
  "alternative_hypothesis": {
    "definition": "The hypothesis H₁ that is accepted when evidence against H₀ is sufficiently strong, representing the effect or difference of interest.",
    "formula": "H₁: θ ≠ θ₀  (two-sided)  or  θ > θ₀  /  θ < θ₀  (one-sided)",
    "parameters": null,
    "intuition": "The alternative is what you believe is true if the null is wrong — the scientific claim you are trying to support.",
    "common_confusion": "The alternative hypothesis should be specified before seeing the data to avoid data dredging.",
    "example_use": "H₁: μ ≠ 0 (two-sided) or H₁: μ > 0 (one-sided)."
  },
  "simple_hypothesis": {
    "definition": "A hypothesis that specifies a single, fully determined distribution — the parameter is pinned to an exact value.",
    "formula": "H: θ = θ₀",
    "parameters": null,
    "intuition": "A simple hypothesis leaves no free parameters — it uniquely specifies the data-generating distribution.",
    "common_confusion": null,
    "example_use": "H₀: p = 0.5 for a coin flip probability is a simple hypothesis."
  },
  "composite_hypothesis": {
    "definition": "A hypothesis that specifies a range of parameter values rather than a single point, leaving the distribution not fully determined.",
    "formula": "H: θ ∈ Θ₀  (where Θ₀ contains more than one point)",
    "parameters": null,
    "intuition": "Most alternative hypotheses in practice are composite — H₁: μ > 0 includes infinitely many possible values of μ.",
    "common_confusion": null,
    "example_use": "H₁: μ > 0 is a composite hypothesis; it does not specify how much greater than 0 the mean is."
  },
  "test_statistic": {
    "definition": "A function of the sample data that measures how far the data is from what H₀ predicts, used to make the rejection decision.",
    "formula": null,
    "parameters": null,
    "intuition": "The test statistic compresses the data into a single number that summarizes the evidence against H₀.",
    "common_confusion": "The test statistic must have a known distribution under H₀ to compute a valid p-value.",
    "example_use": "The t-statistic T = (X̄ - μ₀)/(S/√n) measures how many standard errors the sample mean is from the null value."
  },
  "critical_value": {
    "definition": "The threshold for the test statistic beyond which H₀ is rejected, determined by the significance level α and the null distribution.",
    "formula": "Reject H₀ if |T| > t_{α/2, n-1}  (two-sided t-test)",
    "parameters": null,
    "intuition": "The critical value is the border of the rejection region — extreme test statistics beyond it indicate implausible data under H₀.",
    "common_confusion": "The critical value depends on both the significance level and the null distribution, not on the data.",
    "example_use": "For a one-sided z-test at α=0.05: critical value z* = 1.645."
  },
  "decision_rule": {
    "definition": "The rule specifying when to reject H₀ based on the test statistic, typically defined by the rejection region or a comparison to the critical value.",
    "formula": null,
    "parameters": null,
    "intuition": "The decision rule converts the test statistic into a binary decision: reject or fail to reject.",
    "common_confusion": null,
    "example_use": "Reject H₀ if the p-value < 0.05, or equivalently if |T| > 1.96 for a two-sided z-test."
  },
  "acceptance_region": {
    "definition": "The set of test statistic values for which H₀ is not rejected.",
    "formula": null,
    "parameters": null,
    "intuition": "The acceptance region is the 'normal' range of the test statistic under H₀ — data that lands here is consistent with the null.",
    "common_confusion": "Falling in the acceptance region does not prove H₀ is true — it only means there is insufficient evidence against it.",
    "example_use": "For a two-sided z-test at α=0.05: acceptance region is |z| ≤ 1.96."
  },
  "rejection_region": {
    "definition": "The set of test statistic values for which H₀ is rejected, also called the critical region.",
    "formula": null,
    "parameters": null,
    "intuition": "The rejection region captures the most extreme test statistics — values that would be very unlikely if H₀ were true.",
    "common_confusion": null,
    "example_use": "For a one-sided z-test at α=0.05: rejection region is z > 1.645."
  },
  "p_value": {
    "definition": "The probability of observing a test statistic at least as extreme as the one obtained, assuming H₀ is true.",
    "formula": "p = P(|T| ≥ |t_obs| | H₀)",
    "parameters": null,
    "intuition": "A small p-value means the observed data would be very unlikely under H₀ — strong evidence against the null.",
    "common_confusion": "The p-value is NOT the probability H₀ is true, nor the probability the result occurred by chance. It is a conditional probability given H₀.",
    "example_use": "p = 0.03 means if H₀ were true, we would see a result this extreme or more in only 3% of experiments."
  },
  "significance_level": {
    "definition": "The pre-specified probability threshold α below which the p-value must fall to reject H₀, representing the acceptable Type I error rate.",
    "formula": "Reject H₀ if p-value < α",
    "parameters": [
      "α: common values are 0.01, 0.05, 0.10"
    ],
    "intuition": "The significance level is the maximum tolerable rate of false rejections — choosing α=0.05 means accepting a 5% chance of incorrectly rejecting a true H₀.",
    "common_confusion": "The significance level is set before the analysis, not after seeing the p-value. Choosing α after seeing data invalidates the test.",
    "example_use": "At α=0.05, a p-value of 0.03 leads to rejection; p=0.07 does not."
  },
  "type_i_error": {
    "definition": "Rejecting H₀ when it is actually true — a false positive. Its probability is the significance level α.",
    "formula": "P(reject H₀ | H₀ true) = α",
    "parameters": null,
    "intuition": "Type I error is a false alarm — concluding there is an effect when there isn't one.",
    "common_confusion": "α controls Type I error, not Type II error. Decreasing α reduces false positives but increases false negatives.",
    "example_use": "Concluding a drug is effective when it is actually no better than placebo is a Type I error."
  },
  "type_ii_error": {
    "definition": "Failing to reject H₀ when H₁ is actually true — a false negative. Its probability is β; power = 1-β.",
    "formula": "P(fail to reject H₀ | H₁ true) = β",
    "parameters": null,
    "intuition": "Type II error is a missed detection — failing to notice a real effect that exists.",
    "common_confusion": "Type II error rate β depends on the true parameter value under H₁ and the sample size. It is not fixed like α.",
    "example_use": "Failing to detect that a drug is effective when it truly works is a Type II error."
  },
  "one_sided_test": {
    "definition": "A hypothesis test with a directional alternative: H₁: θ > θ₀ or H₁: θ < θ₀, with the entire rejection region in one tail.",
    "formula": "Reject if T > t_{α, n-1}  (upper one-sided)",
    "parameters": null,
    "intuition": "Use a one-sided test when you have a specific directional prediction and are only interested in effects in that direction.",
    "common_confusion": "One-sided tests are more powerful than two-sided tests for detecting effects in the specified direction, but provide no protection against effects in the other direction.",
    "example_use": "Testing H₁: μ_new > μ_old when you only care if the new drug is better, not worse."
  },
  "two_sided_test": {
    "definition": "A hypothesis test with a non-directional alternative: H₁: θ ≠ θ₀, with the rejection region split between both tails.",
    "formula": "Reject if |T| > t_{α/2, n-1}",
    "parameters": null,
    "intuition": "Use a two-sided test when you want to detect effects in either direction — the default choice in most analyses.",
    "common_confusion": "A two-sided test at level α has α/2 in each tail, making the critical values more extreme than a one-sided test.",
    "example_use": "Testing H₁: μ ≠ 0 to detect any non-zero treatment effect."
  },
  "hypothesis_testing_using_p_values": {
    "definition": "The procedure of computing a p-value from the test statistic and comparing it to α to make the reject/fail-to-reject decision.",
    "formula": "Reject H₀ iff p-value < α",
    "parameters": null,
    "intuition": "P-value testing provides a continuous measure of evidence against H₀ — smaller p-values indicate stronger evidence.",
    "common_confusion": "A p-value of 0.049 and 0.051 are not meaningfully different, despite falling on opposite sides of the α=0.05 threshold.",
    "example_use": "Compute z-statistic, look up P(Z > z_obs) in normal table, compare to 0.05."
  },
  "z_test": {
    "definition": "A hypothesis test using a standard normal test statistic, applicable when σ is known or the sample size is large.",
    "formula": "Z = (X̄ - μ₀) / (σ/√n)  ~  N(0,1)  under H₀",
    "parameters": null,
    "intuition": "The z-test measures how many standard errors the sample mean is from the null value — extreme z-values indicate the data is inconsistent with H₀.",
    "common_confusion": "The z-test requires σ to be known. In practice σ is almost always unknown, making the t-test more appropriate for small samples.",
    "example_use": "Testing H₀: μ = 100 with known σ = 15 and n = 64: Z = (X̄ - 100)/(15/8)."
  },
  "two_sample_z_test": {
    "definition": "A z-test comparing the means of two independent populations when both population standard deviations are known.",
    "formula": "Z = (X̄₁ - X̄₂) / √(σ₁²/n₁ + σ₂²/n₂)",
    "parameters": null,
    "intuition": "Test whether two groups have the same mean when the population variances are known (rare in practice).",
    "common_confusion": null,
    "example_use": "Comparing mean scores of two large student cohorts when historical variance estimates are available."
  },
  "one_sample_t_test": {
    "definition": "A hypothesis test for the mean of a normal population with unknown variance, using the t-distribution.",
    "formula": "T = (X̄ - μ₀) / (S/√n)  ~  t(n-1)  under H₀",
    "parameters": null,
    "intuition": "The most common test for a single mean — replace the unknown σ with S and account for the extra uncertainty via the t-distribution.",
    "common_confusion": "The t-test assumes normality of the population. For large samples the CLT makes it robust to departures from normality.",
    "example_use": "Testing whether the mean exam score equals 70: T = (X̄ - 70)/(S/√n) with n-1 df."
  },
  "two_sample_t_test": {
    "definition": "A hypothesis test comparing the means of two independent normal populations with unknown variances.",
    "formula": "T = (X̄₁ - X̄₂) / SE(X̄₁ - X̄₂)  ~  t(df)  under H₀: μ₁=μ₂",
    "parameters": null,
    "intuition": "Test whether two groups have the same mean when variances are unknown — the most common two-group comparison.",
    "common_confusion": "The pooled t-test assumes equal variances; Welch's t-test does not. Welch's is generally safer to use.",
    "example_use": "Comparing mean blood pressure between a treatment group and a control group."
  },
  "wald_test": {
    "definition": "A hypothesis test based on the asymptotic normality of the MLE: W = (θ̂ - θ₀)² / Var(θ̂) ~ χ²(1) under H₀.",
    "formula": "W = (θ̂ - θ₀)ᵀ [Var(θ̂)]⁻¹ (θ̂ - θ₀)  ~  χ²(p)  under H₀",
    "parameters": null,
    "intuition": "The Wald test asks: is the MLE far enough from the null value (relative to its uncertainty) to reject H₀?",
    "common_confusion": "The Wald test is not invariant to reparameterization — testing H₀: θ=1 vs H₀: log θ=0 may give different p-values.",
    "example_use": "The z-tests in logistic regression output are Wald tests for each coefficient."
  },
  "likelihood_ratio_test": {
    "definition": "A hypothesis test comparing the maximum likelihood under H₀ to the unrestricted maximum likelihood: LRT = -2 log Λ ~ χ²(df) under H₀.",
    "formula": "LRT = -2 log[L(θ̂₀)/L(θ̂)] = 2[ℓ(θ̂) - ℓ(θ̂₀)]  ~  χ²(p-q)",
    "parameters": [
      "df = difference in number of free parameters between H₁ and H₀ models"
    ],
    "intuition": "LRT asks: how much better does the unrestricted model fit compared to the restricted model? Large improvement → reject H₀.",
    "common_confusion": "The LRT is asymptotically equivalent to the Wald and score tests but often has better finite-sample properties.",
    "example_use": "Testing whether a set of regression coefficients are jointly zero using LRT (equivalent to the F-test in linear regression)."
  },
  "chi_square_test_for_population_variance": {
    "definition": "A hypothesis test for a normal population variance using the test statistic (n-1)S²/σ₀² ~ χ²(n-1) under H₀: σ²=σ₀².",
    "formula": "χ² = (n-1)S²/σ₀²  ~  χ²(n-1)  under H₀",
    "parameters": null,
    "intuition": "Test whether the sample variance is consistent with a hypothesized population variance.",
    "common_confusion": "This test is very sensitive to non-normality of the population, more so than t-tests for the mean.",
    "example_use": "Testing whether the variance of a manufacturing process equals the target specification value."
  },
  "bayesian_testing_concepts": {
    "definition": "The framework for hypothesis testing within Bayesian inference, using posterior probabilities and Bayes factors rather than p-values.",
    "formula": null,
    "parameters": null,
    "intuition": "Bayesian testing directly computes the probability that a hypothesis is true given the data, rather than the probability of data given the hypothesis.",
    "common_confusion": null,
    "example_use": "Computing P(H₀|data) and P(H₁|data) using Bayes factors to compare models."
  },
  "bayesian_p_value": {
    "definition": "A Bayesian measure of evidence against a model, computed as the posterior probability of observing data as extreme as or more extreme than the observed data.",
    "formula": "p_B = P(T(X_rep) ≥ T(x_obs) | x_obs)",
    "parameters": null,
    "intuition": "The Bayesian p-value checks model fit by comparing observed test statistics to those from posterior predictive replications.",
    "common_confusion": "The Bayesian p-value is not equivalent to the frequentist p-value and should not be compared to α=0.05 in the same way.",
    "example_use": "Posterior predictive p-values are used in Bayesian model checking to assess whether the model fits the data."
  },
  "population_parameters": {
    "definition": "Numerical characteristics of a population distribution — such as the mean, variance, or proportion — that statistical inference aims to estimate.",
    "formula": null,
    "parameters": null,
    "intuition": "Population parameters are the unknowns that describe the true state of the world; sample statistics are our imperfect glimpses of them.",
    "common_confusion": null,
    "example_use": "μ, σ², and p are population parameters estimated by X̄, S², and p̂ respectively."
  },
  "summary_statistics": {
    "definition": "Numerical summaries computed from sample data that describe key features of the data, such as location, spread, and shape.",
    "formula": null,
    "parameters": null,
    "intuition": "Summary statistics compress raw data into interpretable numbers — the mean, median, standard deviation, and quartiles are the most common.",
    "common_confusion": null,
    "example_use": "Reporting the mean, standard deviation, minimum, and maximum of a dataset as summary statistics."
  },
  "statistical_estimation": {
    "definition": "The branch of statistical inference concerned with using sample data to approximate unknown population parameters or functions thereof.",
    "formula": null,
    "parameters": null,
    "intuition": "Statistical estimation is the science of making good guesses from incomplete information — trading off bias, variance, and computational cost.",
    "common_confusion": null,
    "example_use": "Estimating the proportion of defective items in a production line from a quality control sample."
  },
  "alternative_estimation_methods": {
    "definition": "Parameter estimation approaches other than maximum likelihood, including method of moments, least squares, and Bayesian methods.",
    "formula": null,
    "parameters": null,
    "intuition": "MLE is not always the best or most practical estimation method — alternatives trade efficiency for simplicity, robustness, or computational convenience.",
    "common_confusion": null,
    "example_use": "Method of moments is simpler to compute than MLE for mixture models."
  },
  "bootstrap_methods": {
    "definition": "A family of resampling-based procedures for approximating sampling distributions and constructing confidence intervals without analytical formulas.",
    "formula": null,
    "parameters": null,
    "intuition": "Bootstrap methods use the data itself to simulate sampling variability — they are a computational alternative to analytical inference.",
    "common_confusion": null,
    "example_use": "Bootstrap the regression coefficient to get a CI that is robust to non-normal residuals."
  },
  "classical_test_procedures": {
    "definition": "The standard frequentist hypothesis tests derived from normal distribution theory: z-tests, t-tests, F-tests, and chi-square tests.",
    "formula": null,
    "parameters": null,
    "intuition": "Classical tests are the workhorses of applied statistics — each is derived from the sampling distribution of a key statistic under H₀.",
    "common_confusion": null,
    "example_use": "The one-sample t-test, two-sample t-test, and F-test for ANOVA are the most commonly used classical test procedures."
  },
  "regression_framework": {
    "definition": "The general statistical framework for modeling the relationship between a response variable and one or more predictor variables.",
    "formula": null,
    "parameters": null,
    "intuition": "Regression is the formal machinery for asking 'how does Y change when X changes?' — it quantifies relationships and enables prediction.",
    "common_confusion": null,
    "example_use": "Modeling house prices as a function of size, location, and number of bedrooms."
  },
  "regression_analysis": {
    "definition": "The statistical process of estimating the relationship between a dependent variable and one or more independent variables using a sample of data.",
    "formula": null,
    "parameters": null,
    "intuition": "Regression analysis is the full workflow: specify a model, estimate its parameters, check assumptions, and interpret results.",
    "common_confusion": "Regression describes association, not causation. Establishing causality requires experimental design or causal inference methods.",
    "example_use": "Analyzing how advertising spend relates to sales revenue after controlling for seasonality."
  },
  "linear_regression": {
    "definition": "A regression model in which the conditional mean of Y is a linear function of the predictors: E[Y|X] = β₀ + β₁X₁ + ... + βₚXₚ.",
    "formula": "Y = β₀ + β₁X₁ + ... + βₚXₚ + ε",
    "parameters": [
      "β₀: intercept",
      "β₁,...,βₚ: regression coefficients",
      "ε: error term with E[ε]=0"
    ],
    "intuition": "Linear regression finds the hyperplane through the predictor space that best explains the response — 'best' meaning smallest squared errors.",
    "common_confusion": "'Linear' refers to linearity in the parameters, not in the predictors. Polynomial regression is a linear model.",
    "example_use": "Predicting student GPA from hours studied and prior test scores."
  },
  "simple_linear_regression": {
    "definition": "Linear regression with a single predictor: Y = β₀ + β₁X + ε, the simplest form of regression analysis.",
    "formula": "Y = β₀ + β₁X + ε,  β̂₁ = Σ(xᵢ-x̄)(yᵢ-ȳ) / Σ(xᵢ-x̄)²",
    "parameters": [
      "β₀: intercept (value of Y when X=0)",
      "β₁: slope (change in Y per unit change in X)"
    ],
    "intuition": "Simple linear regression fits a straight line through a scatterplot — the line that minimizes squared vertical distances.",
    "common_confusion": "The slope estimates the association between X and Y, not the causal effect of X on Y.",
    "example_use": "Fitting a line to predict weight from height."
  },
  "multiple_linear_regression": {
    "definition": "Linear regression with two or more predictors, modeling E[Y|X₁,...,Xₚ] = β₀ + β₁X₁ + ... + βₚXₚ.",
    "formula": "Y = Xβ + ε,  β̂ = (XᵀX)⁻¹Xᵀy",
    "parameters": [
      "β₀,...,βₚ: regression coefficients",
      "X: n×(p+1) design matrix"
    ],
    "intuition": "Multiple regression controls for confounders — each coefficient estimates the effect of one predictor holding all others fixed.",
    "common_confusion": "Coefficients change when predictors are added or removed. Adding a correlated predictor can reverse the sign of an existing coefficient (Simpson's paradox).",
    "example_use": "Predicting salary from years of experience, education level, and job title."
  },
  "dependent_variable": {
    "definition": "The outcome variable Y that the regression model aims to explain or predict, also called the response variable.",
    "formula": null,
    "parameters": null,
    "intuition": "The dependent variable is what you are trying to understand — it depends on (is influenced by) the predictors.",
    "common_confusion": "The label 'dependent' describes the modeling role, not necessarily a causal relationship.",
    "example_use": "In a salary regression, annual salary is the dependent variable."
  },
  "independent_variable": {
    "definition": "A predictor variable X used to explain or predict the dependent variable, also called a covariate, regressor, or feature.",
    "formula": null,
    "parameters": null,
    "intuition": "Independent variables are the inputs to the regression — they explain variation in the response.",
    "common_confusion": "In observational studies, 'independent' variables are often correlated with each other, violating the spirit of the term.",
    "example_use": "In a salary regression, years of experience and education level are independent variables."
  },
  "numeric_variable": {
    "definition": "A predictor that takes continuous or discrete numerical values and enters the regression model directly.",
    "formula": null,
    "parameters": null,
    "intuition": "Numeric variables are the natural inputs to regression — their coefficients measure the change in Y per unit change in X.",
    "common_confusion": null,
    "example_use": "Age, income, and temperature are numeric variables."
  },
  "categorical_variable": {
    "definition": "A variable that takes values from a finite set of categories, requiring special encoding (dummy variables) to enter a regression model.",
    "formula": null,
    "parameters": null,
    "intuition": "Categorical variables cannot enter regression directly — they must be converted to numbers via dummy encoding.",
    "common_confusion": "Treating a categorical variable as numeric (e.g. coding categories 1, 2, 3) imposes an artificial ordering and equal spacing.",
    "example_use": "Region (North, South, East, West) is a categorical variable requiring 3 dummy variables."
  },
  "factor_variable": {
    "definition": "A categorical variable in a statistical model, where each level represents a distinct group and effects are estimated relative to a reference level.",
    "formula": null,
    "parameters": null,
    "intuition": "A factor variable partitions observations into discrete groups — the regression estimates a separate adjustment for each group.",
    "common_confusion": null,
    "example_use": "Treatment group (A, B, C) is a factor variable in a clinical trial analysis."
  },
  "nominal_predictor": {
    "definition": "A categorical predictor with no natural ordering among its levels, requiring full dummy variable encoding.",
    "formula": null,
    "parameters": null,
    "intuition": "Nominal predictors have categories that are purely qualitative — like colors or country names — with no implied ranking.",
    "common_confusion": null,
    "example_use": "Country of origin is a nominal predictor — there is no natural ordering of countries."
  },
  "categorical_predictor": {
    "definition": "Any predictor variable with a finite number of distinct categories, encoded as dummy variables in a regression model.",
    "formula": null,
    "parameters": null,
    "intuition": "Categorical predictors let regression models fit different intercepts (or slopes) for different groups.",
    "common_confusion": null,
    "example_use": "Gender encoded as a dummy variable (0/1) in a wage regression."
  },
  "reference_level": {
    "definition": "The baseline category of a factor variable against which all other levels are compared in a dummy variable encoding.",
    "formula": null,
    "parameters": null,
    "intuition": "The reference level is the group assigned all zeros — every other group's coefficient measures its difference from this baseline.",
    "common_confusion": "The choice of reference level changes the coefficients but not the overall fit or predicted values.",
    "example_use": "With region (North, South, East, West), setting North as reference level: coefficients for South, East, West measure differences from North."
  },
  "polynomial_predictor": {
    "definition": "A predictor entered as X, X², X³, etc. to model nonlinear (curved) relationships within the linear model framework.",
    "formula": "Y = β₀ + β₁X + β₂X² + ... + βₖXᵏ + ε",
    "parameters": null,
    "intuition": "Polynomial predictors let a linear model fit curves — the model is still linear in parameters, just nonlinear in X.",
    "common_confusion": "High-degree polynomials overfit badly. Use orthogonal polynomials or splines for smoother fits.",
    "example_use": "Modeling crop yield as a quadratic function of rainfall: Y = β₀ + β₁X + β₂X²."
  },
  "linear_relationship": {
    "definition": "A relationship between two variables where a unit change in X is associated with a constant change in Y, regardless of X's current value.",
    "formula": "E[Y|X] = β₀ + β₁X",
    "parameters": null,
    "intuition": "A linear relationship plots as a straight line — the effect of X on Y is the same at every value of X.",
    "common_confusion": "Many real relationships are approximately linear over a limited range but nonlinear globally.",
    "example_use": "Assuming a linear relationship between hours studied and exam score improvement."
  },
  "linear_trend": {
    "definition": "A systematic linear change in a variable over time or across values of a predictor, captured by a nonzero slope coefficient.",
    "formula": null,
    "parameters": null,
    "intuition": "A linear trend means the response increases (or decreases) at a constant rate as the predictor increases.",
    "common_confusion": null,
    "example_use": "A positive linear trend in CO₂ levels over decades."
  },
  "intercept": {
    "definition": "The coefficient β₀ in a regression model, representing the expected value of Y when all predictors equal zero.",
    "formula": "β₀ = E[Y | X₁=0, X₂=0, ..., Xₚ=0]",
    "parameters": null,
    "intuition": "The intercept anchors the regression line or hyperplane — it sets the baseline level of Y.",
    "common_confusion": "The intercept is often not directly interpretable if X=0 is outside the observed range of the data.",
    "example_use": "In a salary regression, the intercept estimates salary when all predictors are zero (may be meaningless)."
  },
  "slope": {
    "definition": "The coefficient β₁ in simple regression, or a partial regression coefficient in multiple regression, measuring the change in E[Y] per unit increase in the corresponding predictor.",
    "formula": "β₁ = ΔE[Y] / ΔX",
    "parameters": null,
    "intuition": "The slope tells you how steeply Y changes with X — positive means Y increases, negative means it decreases.",
    "common_confusion": "In multiple regression, each slope is a partial effect — the change in Y per unit of Xⱼ holding all other predictors constant.",
    "example_use": "A slope of 5000 in a salary regression means each additional year of experience is associated with $5000 higher salary."
  },
  "error_term": {
    "definition": "The unobservable random component ε in a regression model, representing all variation in Y not explained by the predictors.",
    "formula": "εᵢ = Yᵢ - (β₀ + β₁X₁ᵢ + ... + βₚXₚᵢ)",
    "parameters": null,
    "intuition": "The error term absorbs everything the model doesn't explain — measurement error, omitted variables, and inherent randomness.",
    "common_confusion": "The error term ε is unobserved. Residuals eᵢ = Yᵢ - Ŷᵢ are the observed estimates of the errors.",
    "example_use": "Two people with identical observed characteristics may have different salaries — the difference is captured by the error term."
  },
  "variance_of_the_error_term": {
    "definition": "The constant variance σ² = Var(εᵢ) assumed for all error terms in classical linear regression (homoscedasticity assumption).",
    "formula": "Var(εᵢ) = σ²  for all  i",
    "parameters": [
      "σ²: error variance, estimated by S² = RSS/(n-p-1)"
    ],
    "intuition": "Constant error variance means the spread of Y around the regression line is the same everywhere — violations create heteroscedasticity.",
    "common_confusion": null,
    "example_use": "In a wage regression, if residuals are larger for high earners, the constant variance assumption is violated."
  },
  "interaction_effect": {
    "definition": "The phenomenon where the effect of one predictor on Y depends on the value of another predictor, modeled by including a product term X₁·X₂.",
    "formula": "Y = β₀ + β₁X₁ + β₂X₂ + β₃X₁X₂ + ε",
    "parameters": [
      "β₃: interaction coefficient — how much β₁ changes per unit of X₂"
    ],
    "intuition": "An interaction means 'it depends' — the effect of X₁ on Y is not constant but varies with X₂.",
    "common_confusion": "Including an interaction term without the main effects (X₁ and X₂) is usually wrong — the hierarchy principle says main effects should be included.",
    "example_use": "The effect of studying on exam score may depend on sleep quality — an interaction between study hours and sleep."
  },
  "design_matrix": {
    "definition": "The n×(p+1) matrix X of predictor values used in matrix formulation of regression, with the first column typically all ones for the intercept.",
    "formula": "X = [[1, x₁₁, ..., x₁ₚ], ..., [1, xₙ₁, ..., xₙₚ]]",
    "parameters": null,
    "intuition": "The design matrix organizes all predictor information into a single structure, enabling compact matrix algebra for estimation.",
    "common_confusion": null,
    "example_use": "For simple linear regression with n observations: X is n×2 with a column of ones and a column of x values."
  },
  "dummy_variable": {
    "definition": "A binary (0/1) indicator variable created to represent membership in a category, used to include categorical predictors in regression.",
    "formula": "Dₖ = 1 if observation belongs to category k, 0 otherwise",
    "parameters": null,
    "intuition": "Dummy variables convert qualitative group membership into numbers that regression can handle.",
    "common_confusion": "For a categorical variable with k levels, include only k-1 dummy variables to avoid perfect multicollinearity (the dummy variable trap).",
    "example_use": "Three regions (A, B, C) require two dummy variables: D_A and D_B (with C as reference)."
  },
  "dummy_encoding": {
    "definition": "The process of creating k-1 binary dummy variables from a categorical variable with k levels, dropping one level as the reference.",
    "formula": null,
    "parameters": null,
    "intuition": "Dummy encoding translates a categorical variable into a form that fits within the linear regression framework.",
    "common_confusion": null,
    "example_use": "Encoding education level (High School, Bachelor, Master, PhD) as three dummy variables."
  },
  "dummy_variable_encoding": {
    "definition": "The specific implementation of dummy encoding in a regression model, specifying which category serves as the reference level.",
    "formula": null,
    "parameters": null,
    "intuition": "The choice of reference category does not affect model fit — only the interpretation of the coefficients changes.",
    "common_confusion": null,
    "example_use": "R's default dummy encoding uses the first alphabetical level as the reference category."
  },
  "ordinary_least_squares": {
    "definition": "The method of estimating regression coefficients by minimizing the sum of squared residuals: β̂ = argmin_β Σ(yᵢ - xᵢᵀβ)².",
    "formula": "β̂ = (XᵀX)⁻¹Xᵀy",
    "parameters": null,
    "intuition": "OLS finds the coefficient vector that makes the regression predictions as close as possible to the observed data, measured by squared error.",
    "common_confusion": "OLS is the MLE when errors are normally distributed. It is BLUE (Best Linear Unbiased Estimator) under the Gauss-Markov conditions.",
    "example_use": "Fitting a linear regression model to predict house prices using OLS."
  },
  "best_linear_unbiased_estimator": {
    "definition": "An estimator that is linear in Y, unbiased for β, and has the smallest variance among all linear unbiased estimators — the property guaranteed by the Gauss-Markov theorem for OLS.",
    "formula": null,
    "parameters": null,
    "intuition": "BLUE means OLS is the most efficient linear unbiased estimator — no other linear unbiased method can beat it under Gauss-Markov conditions.",
    "common_confusion": "BLUE requires the Gauss-Markov conditions: zero-mean errors, homoscedasticity, and no serial correlation. Violations break the BLUE property.",
    "example_use": "Under homoscedastic, uncorrelated errors, OLS estimates are BLUE by the Gauss-Markov theorem."
  },
  "partial_regression_coefficient": {
    "definition": "A regression coefficient βⱼ in multiple regression, representing the expected change in Y per unit increase in Xⱼ holding all other predictors constant.",
    "formula": null,
    "parameters": null,
    "intuition": "The partial coefficient isolates the unique contribution of one predictor after removing the effects of all others.",
    "common_confusion": "'Holding other predictors constant' is a statistical concept — in observational data, changing one predictor often means others change too.",
    "example_use": "The coefficient on education in a wage regression estimates the wage increase per year of schooling, controlling for experience."
  },
  "distribution_of_ols_estimators": {
    "definition": "Under normal errors, β̂ ~ N(β, σ²(XᵀX)⁻¹), providing the basis for t-tests and confidence intervals in regression.",
    "formula": "β̂ ~ N(β, σ²(XᵀX)⁻¹)",
    "parameters": null,
    "intuition": "The OLS estimator is itself normally distributed under the normal linear model — this distribution is what makes t-tests for coefficients valid.",
    "common_confusion": "This exact normality requires normal errors. For non-normal errors, the distribution of β̂ is only approximately normal (via CLT) for large n.",
    "example_use": "The sampling distribution of β̂₁ is N(β₁, σ²/Σ(xᵢ-x̄)²)."
  },
  "total_sum_of_squares": {
    "definition": "The total variability in Y around its mean: SST = Σ(yᵢ - ȳ)², measuring how much Y varies before any predictors are considered.",
    "formula": "SST = Σᵢ (yᵢ - ȳ)²",
    "parameters": null,
    "intuition": "SST is the baseline — it measures how much you'd be wrong if you just predicted ȳ for everyone.",
    "common_confusion": null,
    "example_use": "SST = SSR + SSE is the fundamental decomposition: total variation = explained + unexplained."
  },
  "regression_sum_of_squares": {
    "definition": "The variation in Y explained by the regression model: SSR = Σ(ŷᵢ - ȳ)², measuring how much the fitted values differ from the overall mean.",
    "formula": "SSR = Σᵢ (ŷᵢ - ȳ)²",
    "parameters": null,
    "intuition": "SSR measures how much of Y's variation the predictors capture — larger SSR means the model explains more.",
    "common_confusion": null,
    "example_use": "R² = SSR/SST is the proportion of total variation explained by the regression."
  },
  "residual_sum_of_squares": {
    "definition": "The unexplained variation in Y after fitting the model: SSE = Σ(yᵢ - ŷᵢ)², also called the sum of squared errors.",
    "formula": "SSE = Σᵢ (yᵢ - ŷᵢ)² = Σᵢ eᵢ²",
    "parameters": null,
    "intuition": "SSE measures how far the fitted values are from the actual data — smaller SSE means a better fit.",
    "common_confusion": "OLS minimizes SSE by definition. Adding any predictor to the model will always decrease SSE, even if the predictor is uninformative.",
    "example_use": "The error variance estimate σ̂² = SSE/(n-p-1)."
  },
  "sum_of_squared_errors": {
    "definition": "Another name for the residual sum of squares: SSE = Σ(yᵢ - ŷᵢ)², the quantity minimized by OLS.",
    "formula": "SSE = Σᵢ (yᵢ - ŷᵢ)²",
    "parameters": null,
    "intuition": "SSE is the objective function of OLS — minimizing it gives the least squares estimates.",
    "common_confusion": null,
    "example_use": "OLS is defined as the estimator that minimizes SSE."
  },
  "variance_decomposition": {
    "definition": "The partition of total variance into components: SST = SSR + SSE, separating explained and unexplained variation.",
    "formula": "SST = SSR + SSE,  i.e., Σ(yᵢ-ȳ)² = Σ(ŷᵢ-ȳ)² + Σ(yᵢ-ŷᵢ)²",
    "parameters": null,
    "intuition": "Variance decomposition is the accounting identity of regression — total variation equals what the model explains plus what it doesn't.",
    "common_confusion": "This decomposition holds exactly only for models with an intercept and fitted by OLS.",
    "example_use": "ANOVA tables are organized around this variance decomposition."
  },
  "coefficient_of_determination": {
    "definition": "R² = SSR/SST, the proportion of total variance in Y explained by the regression model, ranging from 0 to 1.",
    "formula": "R² = SSR/SST = 1 - SSE/SST",
    "parameters": null,
    "intuition": "R² tells you what fraction of Y's variation is captured by the predictors — R²=0.8 means 80% explained.",
    "common_confusion": "R² always increases when predictors are added, even useless ones. Use adjusted R² or information criteria for model comparison.",
    "example_use": "R²=0.65 means the predictors explain 65% of the variation in the response."
  },
  "prediction": {
    "definition": "The use of an estimated regression model to forecast the value of Y for a new observation with given predictor values.",
    "formula": "Ŷ_new = x_new^ᵀ β̂",
    "parameters": null,
    "intuition": "Prediction applies the fitted model to new inputs — the goal of predictive modeling.",
    "common_confusion": "Predictions outside the range of the training data (extrapolation) are unreliable.",
    "example_use": "Using a fitted salary regression to predict the salary of a new employee with given qualifications."
  },
  "fitted_value": {
    "definition": "The model's prediction for an observation in the training data: ŷᵢ = xᵢᵀβ̂, also called the predicted value.",
    "formula": "ŷᵢ = xᵢᵀβ̂ = x̂ᵢᵀ(XᵀX)⁻¹Xᵀy",
    "parameters": null,
    "intuition": "Fitted values are the regression model's best guesses for the training data — the vertical projections onto the regression line.",
    "common_confusion": "Fitted values are not observations — they are model-derived estimates of the conditional mean E[Y|X=xᵢ].",
    "example_use": "The fitted value ŷᵢ and residual eᵢ = yᵢ - ŷᵢ together reconstruct the observed value."
  },
  "residual": {
    "definition": "The difference between the observed response and the fitted value: eᵢ = yᵢ - ŷᵢ, an estimate of the true error term εᵢ.",
    "formula": "eᵢ = yᵢ - ŷᵢ",
    "parameters": null,
    "intuition": "Residuals are what the model gets wrong — analyzing them reveals whether model assumptions hold.",
    "common_confusion": "Residuals are not the same as error terms. Errors εᵢ are unobservable; residuals eᵢ are computable from data.",
    "example_use": "Plotting residuals vs. fitted values to check for heteroscedasticity or nonlinearity."
  },
  "standardized_residual": {
    "definition": "A residual divided by an estimate of its standard deviation: rᵢ = eᵢ / (σ̂√(1-hᵢᵢ)), enabling comparison across observations.",
    "formula": "rᵢ = eᵢ / (σ̂√(1-hᵢᵢ))",
    "parameters": [
      "hᵢᵢ: leverage of observation i"
    ],
    "intuition": "Standardized residuals put all residuals on the same scale — values beyond ±2 or ±3 flag potential outliers.",
    "common_confusion": null,
    "example_use": "Standardized residuals larger than 3 in absolute value suggest the observation may be an outlier."
  },
  "studentized_residual": {
    "definition": "A residual divided by an estimate of its standard deviation computed without observation i: tᵢ = eᵢ / (S₍₋ᵢ₎√(1-hᵢᵢ)), following a t-distribution.",
    "formula": "tᵢ = eᵢ / (S₍₋ᵢ₎√(1-hᵢᵢ))",
    "parameters": null,
    "intuition": "Studentized residuals are more sensitive than standardized residuals for outlier detection because they use a leave-one-out variance estimate.",
    "common_confusion": "Externally studentized (deleted) residuals use S₍₋ᵢ₎ (leave-one-out); internally studentized use the full dataset S.",
    "example_use": "Externally studentized residuals follow a t(n-p-2) distribution, enabling formal outlier tests."
  },
  "residual_variance": {
    "definition": "The estimate of the error variance from residuals: σ̂² = SSE/(n-p-1), where p is the number of predictors.",
    "formula": "σ̂² = SSE/(n-p-1) = Σeᵢ² / (n-p-1)",
    "parameters": [
      "n-p-1: residual degrees of freedom"
    ],
    "intuition": "Residual variance measures how much scatter remains around the fitted line — smaller values indicate a better-fitting model.",
    "common_confusion": "Dividing by n-p-1 rather than n makes σ̂² an unbiased estimator of σ².",
    "example_use": "S = √σ̂² is the residual standard error reported in regression output."
  },
  "residual_analysis": {
    "definition": "The examination of regression residuals to check model assumptions and identify problematic observations.",
    "formula": null,
    "parameters": null,
    "intuition": "If the model is correctly specified, residuals should look like random noise. Systematic patterns reveal violations.",
    "common_confusion": null,
    "example_use": "A funnel shape in a residuals-vs-fitted plot indicates heteroscedasticity."
  },
  "residual_plot": {
    "definition": "A graphical diagnostic tool plotting residuals against fitted values or predictors to check regression assumptions.",
    "formula": null,
    "parameters": null,
    "intuition": "A well-fitted model has residuals scattered randomly around zero with no pattern — any systematic shape suggests a problem.",
    "common_confusion": "Residual plots should be checked before trusting inference results. Inference based on a misspecified model is unreliable.",
    "example_use": "Plotting eᵢ vs ŷᵢ to check for nonlinearity or heteroscedasticity."
  },
  "outlier": {
    "definition": "An observation with an unusually large residual, meaning Y is far from what the model predicts given its X values.",
    "formula": null,
    "parameters": null,
    "intuition": "Outliers stand out vertically — their Y values are unexpected given their X values.",
    "common_confusion": "Outliers (large residuals) and high-leverage points (unusual X values) are different problems requiring different diagnostics.",
    "example_use": "An observation with studentized residual |tᵢ| > 3 is flagged as a potential outlier."
  },
  "cooks_distance": {
    "definition": "A measure of how much the estimated regression coefficients change when observation i is deleted: Dᵢ = eᵢ²hᵢᵢ / (p σ̂²(1-hᵢᵢ)²).",
    "formula": "Dᵢ = [eᵢ² / (p σ̂²)] · [hᵢᵢ/(1-hᵢᵢ)²]",
    "parameters": null,
    "intuition": "Cook's distance combines outlier magnitude with leverage — an influential point is one that substantially changes the fitted model if removed.",
    "common_confusion": "A point can have high Cook's distance due to high leverage even if its residual is small, or due to a large residual even with modest leverage.",
    "example_use": "Dᵢ > 1 (or > 4/n) is a common rule-of-thumb for flagging influential observations."
  },
  "hat_matrix": {
    "definition": "The projection matrix H = X(XᵀX)⁻¹Xᵀ such that ŷ = Hy, projecting observed Y onto the column space of X.",
    "formula": "H = X(XᵀX)⁻¹Xᵀ,  ŷ = Hy",
    "parameters": null,
    "intuition": "The hat matrix 'puts the hat on Y' — it transforms observed values into fitted values through a linear projection.",
    "common_confusion": null,
    "example_use": "The diagonal elements hᵢᵢ of H are the leverages; e = (I-H)y gives the residuals."
  },
  "leverage": {
    "definition": "The diagonal element hᵢᵢ of the hat matrix, measuring how far observation i's predictor values are from the center of the predictor space.",
    "formula": "hᵢᵢ = xᵢᵀ(XᵀX)⁻¹xᵢ,  0 ≤ hᵢᵢ ≤ 1,  Σhᵢᵢ = p+1",
    "parameters": null,
    "intuition": "High-leverage points have unusual X values — they have the potential to pull the fitted line strongly toward themselves.",
    "common_confusion": "High leverage alone is not harmful — a high-leverage point on the regression line is not influential. It becomes influential if it is also an outlier.",
    "example_use": "hᵢᵢ > 2(p+1)/n is a common rule-of-thumb for high leverage."
  },
  "high_leverage_point": {
    "definition": "An observation with unusually large leverage hᵢᵢ, meaning its predictor values are far from the average predictor values.",
    "formula": null,
    "parameters": null,
    "intuition": "High-leverage points are outliers in X-space — they sit far from the bulk of the data in the predictor dimensions.",
    "common_confusion": null,
    "example_use": "An observation with x value 5 standard deviations from the mean has high leverage in simple regression."
  },
  "homoscedasticity": {
    "definition": "The assumption that the variance of the error term is constant across all observations: Var(εᵢ) = σ² for all i.",
    "formula": "Var(εᵢ|Xᵢ) = σ²  (constant)",
    "parameters": null,
    "intuition": "Homoscedasticity means the spread of Y around the regression line is the same everywhere — a uniform-width band.",
    "common_confusion": "Homoscedasticity is required for OLS to be BLUE. Violations (heteroscedasticity) don't bias estimates but inflate standard errors.",
    "example_use": "In an income regression, if residuals are larger for high-income observations, homoscedasticity is violated."
  },
  "normality_of_errors": {
    "definition": "The assumption that the error terms follow a normal distribution: εᵢ ~ N(0, σ²), required for exact t and F tests in finite samples.",
    "formula": "ε ~ N(0, σ²I)",
    "parameters": null,
    "intuition": "Normality of errors makes the distribution of β̂ exactly normal, enabling exact inference. For large samples, the CLT makes this less critical.",
    "common_confusion": "Normality of errors is about the errors, not the response Y or the predictors X. Y can be non-normal due to non-normal X distributions.",
    "example_use": "QQ-plots of residuals check the normality assumption."
  },
  "pairwise_correlation": {
    "definition": "The Pearson correlation between two predictors Xⱼ and Xₖ, used to detect potential multicollinearity problems.",
    "formula": "r_{jk} = Cov(Xⱼ, Xₖ)/(SD(Xⱼ)SD(Xₖ))",
    "parameters": null,
    "intuition": "Highly correlated predictors carry similar information — including both creates collinearity problems.",
    "common_confusion": "High pairwise correlation between two predictors indicates collinearity, but multicollinearity can exist without any single high pairwise correlation.",
    "example_use": "A correlation of 0.95 between height and weight in a regression suggests multicollinearity."
  },
  "pearson_correlation_coefficient": {
    "definition": "The standardized measure of linear association between two variables: r = Cov(X,Y)/(SD(X)·SD(Y)), ranging from -1 to 1.",
    "formula": "r = Σ(xᵢ-x̄)(yᵢ-ȳ) / √[Σ(xᵢ-x̄)² Σ(yᵢ-ȳ)²]",
    "parameters": null,
    "intuition": "Pearson correlation measures how closely two variables track each other linearly — ±1 is perfect linear relationship, 0 is no linear association.",
    "common_confusion": "In simple regression, r² equals R². This connection breaks down in multiple regression.",
    "example_use": "r=0.85 between study hours and exam scores indicates a strong positive linear association."
  },
  "multicollinearity": {
    "definition": "A condition where two or more predictors in a regression model are highly correlated, making it difficult to estimate their individual effects precisely.",
    "formula": null,
    "parameters": null,
    "intuition": "Multicollinearity means the predictors carry redundant information — it inflates standard errors and makes individual coefficients unstable.",
    "common_confusion": "Multicollinearity does not bias OLS estimates but inflates their variances. Predictions may still be reliable even with severe multicollinearity.",
    "example_use": "Including both 'years of education' and 'highest degree' as predictors creates multicollinearity."
  },
  "perfect_multicollinearity": {
    "definition": "An extreme case where one predictor is an exact linear combination of others, making XᵀX singular and OLS impossible to compute.",
    "formula": "Xβ = 0 for some β ≠ 0  ⟹  XᵀX is singular",
    "parameters": null,
    "intuition": "Perfect multicollinearity means one predictor is completely redundant — the model cannot distinguish their individual effects.",
    "common_confusion": null,
    "example_use": "Including all k dummy variables for a k-level factor (dummy variable trap) creates perfect multicollinearity."
  },
  "linear_dependence_among_predictors": {
    "definition": "The condition where one predictor can be expressed as a linear combination of others, leading to a rank-deficient design matrix.",
    "formula": null,
    "parameters": null,
    "intuition": "Linearly dependent predictors make OLS fail — the design matrix is singular and cannot be inverted.",
    "common_confusion": null,
    "example_use": "If X₃ = 2X₁ + X₂, the predictors are linearly dependent and OLS cannot estimate separate effects."
  },
  "variance_inflation_factor": {
    "definition": "A measure of multicollinearity for predictor Xⱼ: VIF_j = 1/(1-R²_j), where R²_j is the R² from regressing Xⱼ on all other predictors.",
    "formula": "VIF_j = 1/(1 - R²_j)",
    "parameters": null,
    "intuition": "VIF tells you how much the variance of β̂_j is inflated due to correlation with other predictors — VIF=10 means variance is 10× what it would be with uncorrelated predictors.",
    "common_confusion": "VIF > 10 is a common rule-of-thumb for problematic multicollinearity, but the threshold depends on the application.",
    "example_use": "VIF = 8 for the 'years of education' coefficient suggests its standard error is √8 ≈ 2.8 times larger due to collinearity."
  },
  "tolerance": {
    "definition": "The reciprocal of VIF: TOL_j = 1/VIF_j = 1 - R²_j, measuring the proportion of variance in Xⱼ not explained by other predictors.",
    "formula": "TOL_j = 1 - R²_j = 1/VIF_j",
    "parameters": null,
    "intuition": "Low tolerance means a predictor is nearly redundant — almost all its variation is explained by other predictors.",
    "common_confusion": null,
    "example_use": "Tolerance < 0.1 (VIF > 10) is often used as a threshold for problematic collinearity."
  },
  "partial_significance_test": {
    "definition": "A test of whether a specific predictor or subset of predictors contributes significantly to the model after accounting for all other predictors.",
    "formula": null,
    "parameters": null,
    "intuition": "Partial tests ask 'does this predictor add anything beyond what the others already explain?' — they test marginal contribution.",
    "common_confusion": null,
    "example_use": "Testing whether adding quadratic terms to a regression significantly improves fit."
  },
  "t_test_for_individual_regression_coefficients": {
    "definition": "A t-test for H₀: βⱼ = 0, using T = β̂ⱼ/SE(β̂ⱼ) ~ t(n-p-1) under H₀.",
    "formula": "T = β̂ⱼ / SE(β̂ⱼ)  ~  t(n-p-1)  under  H₀: βⱼ=0",
    "parameters": null,
    "intuition": "This test asks whether predictor Xⱼ is significantly associated with Y after controlling for all other predictors.",
    "common_confusion": "A non-significant t-test does not mean Xⱼ has no effect — it may be masked by multicollinearity or low power.",
    "example_use": "Testing whether the coefficient on 'years of education' is significantly different from zero."
  },
  "t_test_for_regression_coefficients": {
    "definition": "The general t-test procedure for any single regression coefficient, testing H₀: βⱼ = β₀ for a specified value β₀.",
    "formula": "T = (β̂ⱼ - β₀) / SE(β̂ⱼ)  ~  t(n-p-1)",
    "parameters": null,
    "intuition": "Tests whether a coefficient equals any specified null value, not just zero.",
    "common_confusion": null,
    "example_use": "Testing whether the price elasticity coefficient equals -1: H₀: β = -1."
  },
  "f_statistic": {
    "definition": "The overall F-statistic for the regression, testing H₀: β₁=...=βₚ=0 (all slopes are zero): F = (SSR/p)/(SSE/(n-p-1)).",
    "formula": "F = (SSR/p) / (SSE/(n-p-1))  ~  F(p, n-p-1)  under  H₀",
    "parameters": null,
    "intuition": "The F-statistic tests whether the regression explains significantly more variation than a model with no predictors.",
    "common_confusion": "A significant overall F-test does not mean all predictors are significant — only that at least one is.",
    "example_use": "F = 45.3 with p < 0.001 means the predictors jointly explain significant variation in Y."
  },
  "analysis_of_variance": {
    "definition": "A statistical method for decomposing total variation into explained and unexplained components, testing whether group means differ significantly.",
    "formula": "F = MSR/MSE = [SSR/df_R] / [SSE/df_E]",
    "parameters": null,
    "intuition": "ANOVA asks whether the variation between group means is larger than the variation within groups — a signal-to-noise ratio test.",
    "common_confusion": "ANOVA is a special case of linear regression with categorical predictors. The F-test in ANOVA and regression are the same procedure.",
    "example_use": "One-way ANOVA tests whether mean exam scores differ across three teaching methods."
  },
  "scatterplot": {
    "definition": "A graphical display of bivariate data where each observation is plotted as a point with X and Y coordinates.",
    "formula": null,
    "parameters": null,
    "intuition": "The scatterplot is the first step in regression analysis — it reveals the direction, strength, and form of the X-Y relationship.",
    "common_confusion": null,
    "example_use": "A scatterplot of height vs. weight with a fitted regression line."
  },
  "scatterplot_matrix": {
    "definition": "A grid of scatterplots showing all pairwise relationships among multiple variables simultaneously.",
    "formula": null,
    "parameters": null,
    "intuition": "The scatterplot matrix gives a quick visual overview of all bivariate relationships in a dataset, revealing correlations and potential collinearity.",
    "common_confusion": null,
    "example_use": "A 4×4 scatterplot matrix for predictors age, education, experience, and salary."
  },
  "data_transformation": {
    "definition": "The application of a mathematical function to a variable to improve the fit of a regression model or satisfy assumptions.",
    "formula": null,
    "parameters": null,
    "intuition": "Transformations can linearize curved relationships, stabilize variance, and normalize skewed distributions.",
    "common_confusion": "Log transformations change the interpretation of coefficients — a coefficient on log(X) measures the effect of a percentage change in X.",
    "example_use": "Taking the log of income to normalize its right-skewed distribution in a regression."
  },
  "centering_variables": {
    "definition": "Subtracting the mean from a predictor (X̃ = X - X̄) to give the intercept a meaningful interpretation and reduce numerical issues.",
    "formula": "X̃ᵢ = Xᵢ - X̄",
    "parameters": null,
    "intuition": "Centering makes the intercept equal E[Y|X=X̄] rather than E[Y|X=0] — often more interpretable when X=0 is outside the data range.",
    "common_confusion": "Centering does not change the slope estimates or p-values in simple regression, only the intercept. In models with interactions it can reduce multicollinearity.",
    "example_use": "Centering age at its mean so the intercept represents expected outcome for average-aged participants."
  },
  "orthogonal_polynomial_transformation": {
    "definition": "The representation of polynomial terms (X, X², X³,...) using orthogonal basis functions to reduce multicollinearity among polynomial predictors.",
    "formula": null,
    "parameters": null,
    "intuition": "Raw polynomial terms X, X², X³ are highly correlated. Orthogonal polynomials decorrelate them, making estimation more stable.",
    "common_confusion": null,
    "example_use": "R's poly() function generates orthogonal polynomial terms for polynomial regression."
  },
  "polynomial_regression_model": {
    "definition": "A linear model using polynomial terms of a predictor to fit nonlinear relationships: Y = β₀ + β₁X + β₂X² + ... + βₖXᵏ + ε.",
    "formula": "Y = β₀ + β₁X + β₂X² + ... + βₖXᵏ + ε",
    "parameters": [
      "k: degree of the polynomial"
    ],
    "intuition": "Polynomial regression stretches the linear model to fit curves while remaining linear in parameters.",
    "common_confusion": "Higher degree polynomials overfit. The degree should be chosen by cross-validation or AIC, not by fitting until the residuals look random.",
    "example_use": "Fitting a quadratic curve to dose-response data where the effect levels off at high doses."
  },
  "interaction_regression_model": {
    "definition": "A linear model including product terms X₁X₂ to model how the effect of one predictor changes with the value of another.",
    "formula": "Y = β₀ + β₁X₁ + β₂X₂ + β₃X₁X₂ + ε",
    "parameters": null,
    "intuition": "Including an interaction term allows the slope of X₁ to vary with X₂, modeling 'it depends' relationships.",
    "common_confusion": "The coefficients on X₁ and X₂ in an interaction model are not main effects in isolation — they are effects when the other variable is zero.",
    "example_use": "Modeling whether the effect of exercise on weight loss depends on diet quality."
  },
  "normal_error_model": {
    "definition": "The linear regression model with normally distributed errors: Y = Xβ + ε, ε ~ N(0, σ²I).",
    "formula": "Y = Xβ + ε,  ε ~ N(0, σ²I)",
    "parameters": null,
    "intuition": "The normal error model enables exact (non-asymptotic) inference — t-tests and F-tests are exact, not just approximate.",
    "common_confusion": "The normal error model is sufficient but not necessary for OLS to be BLUE (Gauss-Markov only requires zero mean, homoscedasticity, and uncorrelated errors).",
    "example_use": "The normal error model is the standard assumption underlying regression t-tests and F-tests."
  },
  "principal_component_regression": {
    "definition": "A regression method that first reduces predictors to principal components and then regresses Y on the selected components, addressing multicollinearity.",
    "formula": null,
    "parameters": null,
    "intuition": "PCR replaces correlated predictors with uncorrelated principal components, solving multicollinearity at the cost of interpretability.",
    "common_confusion": "PCR selects components by variance in X, not by association with Y. Components with small variance might still be important predictors of Y.",
    "example_use": "When 20 correlated financial indicators are used as predictors, PCR reduces them to 5 uncorrelated components."
  },
  "ridge_regression": {
    "definition": "A regularized regression method that adds a penalty λΣβⱼ² to the OLS objective, shrinking coefficients toward zero to handle multicollinearity.",
    "formula": "β̂_ridge = argmin_β [Σ(yᵢ - xᵢᵀβ)² + λΣβⱼ²] = (XᵀX + λI)⁻¹Xᵀy",
    "parameters": [
      "λ: regularization parameter (λ≥0); larger λ means more shrinkage"
    ],
    "intuition": "Ridge regression trades a small increase in bias for a large decrease in variance — useful when predictors are collinear.",
    "common_confusion": "Ridge regression shrinks coefficients but never sets them exactly to zero. For variable selection, use Lasso (L1 penalty).",
    "example_use": "Applying ridge regression to a genetics dataset with thousands of correlated SNP predictors."
  },
  "coefficients": {
    "definition": "The estimated parameters β̂₀, β̂₁, ..., β̂ₚ in a regression model, quantifying the relationship between each predictor and the response.",
    "formula": null,
    "parameters": null,
    "intuition": "Coefficients are the model's description of how the world works — each one measures the contribution of one predictor to the response.",
    "common_confusion": "Coefficient magnitudes are not directly comparable unless predictors are on the same scale. Standardized coefficients enable comparison.",
    "example_use": "A coefficient of 2.3 on 'years of experience' means each additional year is associated with a 2.3-unit increase in the response."
  },
  "sum_of_squares": {
    "definition": "The general term for sums of squared deviations used in regression analysis, including SST, SSR, and SSE.",
    "formula": null,
    "parameters": null,
    "intuition": "Sums of squares partition variation — they are the building blocks of R², F-tests, and ANOVA tables.",
    "common_confusion": null,
    "example_use": "The ANOVA table organizes SSR, SSE, and SST along with their degrees of freedom and mean squares."
  },
  "model_components": {
    "definition": "The structural parts of a regression model: the systematic component (Xβ) capturing the predictable variation and the random component (ε) capturing unexplained variation.",
    "formula": "Y = systematic component + random component = Xβ + ε",
    "parameters": null,
    "intuition": "Every regression model decomposes Y into what can be explained by the predictors and what cannot.",
    "common_confusion": null,
    "example_use": "In Y = 3 + 2X + ε, the systematic component is 3+2X and ε is the random component."
  },
  "predictor_types": {
    "definition": "The classification of regression predictors by their nature: numeric (continuous/discrete), categorical (nominal/ordinal), polynomial, or interaction terms.",
    "formula": null,
    "parameters": null,
    "intuition": "Different predictor types require different encodings and have different interpretations in the regression model.",
    "common_confusion": null,
    "example_use": "A regression model may include a mix of numeric, categorical, and interaction predictors."
  },
  "linear_relationship_structure": {
    "definition": "The assumption and structural form that the conditional mean of Y is a linear function of the parameters (though not necessarily of the predictors themselves).",
    "formula": null,
    "parameters": null,
    "intuition": "The linear structure is what makes OLS analytically tractable — it ensures a unique closed-form solution.",
    "common_confusion": null,
    "example_use": "Y = β₀ + β₁X + β₂X² is linear in parameters (β₀, β₁, β₂) even though it is nonlinear in X."
  },
  "design_matrix_representation": {
    "definition": "The matrix formulation of the regression model as Y = Xβ + ε, compactly representing all observations and predictors.",
    "formula": null,
    "parameters": null,
    "intuition": "The design matrix representation allows the entire regression problem to be solved in one compact matrix equation.",
    "common_confusion": null,
    "example_use": "β̂ = (XᵀX)⁻¹Xᵀy is the OLS solution derived from the design matrix representation."
  },
  "estimation": {
    "definition": "The process of using sample data to determine the regression coefficients β, most commonly via ordinary least squares.",
    "formula": null,
    "parameters": null,
    "intuition": "Estimation converts the abstract regression model into specific numerical values that best describe the data.",
    "common_confusion": null,
    "example_use": "Estimating β in Y = Xβ + ε by minimizing SSE gives β̂ = (XᵀX)⁻¹Xᵀy."
  },
  "estimator_distribution": {
    "definition": "The probability distribution of the OLS estimator β̂, which is N(β, σ²(XᵀX)⁻¹) under the normal error model.",
    "formula": "β̂ ~ N(β, σ²(XᵀX)⁻¹)",
    "parameters": null,
    "intuition": "Knowing the distribution of β̂ enables inference — confidence intervals and hypothesis tests for regression coefficients.",
    "common_confusion": null,
    "example_use": "The t-statistic for testing H₀: βⱼ=0 is derived from the distribution of β̂ⱼ."
  },
  "model_fit_and_variance_decomposition": {
    "definition": "The assessment of how well a regression model fits the data, summarized by R², adjusted R², and the ANOVA decomposition SST = SSR + SSE.",
    "formula": null,
    "parameters": null,
    "intuition": "Model fit quantifies how much of Y's variation the model captures — high fit means the predictors explain most of the variation.",
    "common_confusion": null,
    "example_use": "An ANOVA table presenting SSR, SSE, R², and the F-statistic summarizes overall model fit."
  },
  "predictions": {
    "definition": "The use of the fitted regression model to generate estimated values of Y for given predictor values, either in-sample or out-of-sample.",
    "formula": null,
    "parameters": null,
    "intuition": "Predictions are the practical output of regression — the model's best estimates of Y for any given X.",
    "common_confusion": null,
    "example_use": "Generating predictions for a new dataset using a fitted regression model."
  },
  "residuals_and_diagnostics": {
    "definition": "The set of tools for examining regression model fit and assumption violations through analysis of residuals and influence measures.",
    "formula": null,
    "parameters": null,
    "intuition": "Residual diagnostics are the quality-control step of regression — they catch problems before conclusions are drawn.",
    "common_confusion": null,
    "example_use": "Checking residuals vs. fitted values, QQ-plots, and Cook's distance plots to validate a regression model."
  },
  "regression_assumptions": {
    "definition": "The conditions required for OLS to have desirable properties: linearity, homoscedasticity, independent errors, normality of errors, and no perfect multicollinearity.",
    "formula": null,
    "parameters": null,
    "intuition": "Regression assumptions are the rules the data-generating process must follow for OLS inference to be valid.",
    "common_confusion": "Not all assumptions are equally important. Normality matters mainly for small samples; independence and correct specification matter always.",
    "example_use": "Checking all regression assumptions before reporting results ensures valid inference."
  },
  "predictor_dependence": {
    "definition": "The presence of correlation or linear relationships among predictors in a regression model, potentially causing multicollinearity.",
    "formula": null,
    "parameters": null,
    "intuition": "When predictors are correlated, the model struggles to separate their individual effects.",
    "common_confusion": null,
    "example_use": "Height and weight as predictors of athletic performance are dependent, complicating coefficient interpretation."
  },
  "collinearity_diagnostics": {
    "definition": "Statistical tools for detecting multicollinearity in regression models, including VIF, tolerance, condition numbers, and correlation matrices.",
    "formula": null,
    "parameters": null,
    "intuition": "Collinearity diagnostics reveal whether coefficient estimates are being inflated by predictor correlation.",
    "common_confusion": null,
    "example_use": "Examining VIF values and the correlation matrix before finalizing a multiple regression model."
  },
  "leverage_structure": {
    "definition": "The pattern of leverage values across observations, determined by the design matrix structure and how far each observation's X values are from the center.",
    "formula": null,
    "parameters": null,
    "intuition": "Understanding leverage structure helps identify which observations have the most influence over the fitted regression.",
    "common_confusion": null,
    "example_use": "Examining the leverage structure to identify observations that may unduly influence the regression line."
  },
  "hypothesis_testing_in_regression": {
    "definition": "The application of hypothesis testing to regression parameters — testing whether individual coefficients, groups of coefficients, or the overall model are statistically significant.",
    "formula": null,
    "parameters": null,
    "intuition": "Hypothesis tests in regression separate signal from noise — they ask whether observed associations are stronger than expected by chance.",
    "common_confusion": null,
    "example_use": "t-tests for individual coefficients and F-tests for groups of coefficients are the main hypothesis tests in regression."
  },
  "data_visualization": {
    "definition": "The use of graphical methods to explore and communicate patterns in regression data, including scatterplots, residual plots, and partial regression plots.",
    "formula": null,
    "parameters": null,
    "intuition": "Visualization reveals what numerical summaries cannot — nonlinearity, outliers, and heteroscedasticity are often visible in plots before formal tests.",
    "common_confusion": null,
    "example_use": "Creating a scatterplot matrix before fitting a multiple regression model."
  },
  "data_transformation_methods": {
    "definition": "The set of techniques for transforming variables to improve linearity, stabilize variance, or normalize distributions in regression analysis.",
    "formula": null,
    "parameters": null,
    "intuition": "Transformations are tools for making data better-behaved — common choices include log, square root, and Box-Cox transforms.",
    "common_confusion": null,
    "example_use": "Applying log transformation to a right-skewed response variable before fitting a linear regression."
  },
  "regression_model_extensions": {
    "definition": "Models that extend basic linear regression to handle nonlinearity, multicollinearity, or non-normal responses, including ridge regression, PCR, and polynomial regression.",
    "formula": null,
    "parameters": null,
    "intuition": "Extensions of linear regression expand its applicability — they handle situations where the basic model fails.",
    "common_confusion": null,
    "example_use": "Ridge regression, LASSO, and polynomial regression are common extensions of basic OLS."
  },
  "interaction": {
    "definition": "A statistical phenomenon where the relationship between a predictor and the response depends on the value of another variable, requiring product terms in the model.",
    "formula": null,
    "parameters": null,
    "intuition": "Interaction means the effects of predictors are not simply additive — the whole is different from the sum of parts.",
    "common_confusion": "Statistical interaction and mechanistic interaction are different concepts. Statistical interaction is about model fit, not causation.",
    "example_use": "The interaction between drug dose and patient age in predicting treatment response."
  },
  "generalized_linear_model": {
    "definition": "A flexible generalization of linear regression that allows the response variable to have a non-normal distribution and links the linear predictor to the mean via a link function.",
    "formula": "g(μᵢ) = xᵢᵀβ,  μᵢ = E[Yᵢ|Xᵢ],  Yᵢ ~ exponential family",
    "parameters": [
      "g(·): link function",
      "μ: conditional mean",
      "φ: dispersion parameter"
    ],
    "intuition": "GLMs extend regression to non-normal responses — binary outcomes, counts, and positive-only data all have natural GLM formulations.",
    "common_confusion": "Linear regression is a GLM with identity link and normal distribution. Logistic regression is a GLM with logit link and Bernoulli distribution.",
    "example_use": "Logistic regression for binary outcomes, Poisson regression for counts, Gamma regression for positive continuous data."
  },
  "random_component": {
    "definition": "The probability distribution assumed for the response variable Y in a GLM, which must belong to the exponential family.",
    "formula": null,
    "parameters": null,
    "intuition": "The random component specifies the noise model — it determines the shape of the distribution around the fitted mean.",
    "common_confusion": null,
    "example_use": "Binomial for binary outcomes, Poisson for counts, Gamma for positive continuous data."
  },
  "systematic_component": {
    "definition": "The linear predictor η = Xβ in a GLM, representing the linear combination of predictors that is linked to the conditional mean.",
    "formula": "η = β₀ + β₁X₁ + ... + βₚXₚ",
    "parameters": null,
    "intuition": "The systematic component is the regression part of the GLM — it is identical in form to linear regression.",
    "common_confusion": null,
    "example_use": "In logistic regression, η = log(p/(1-p)) is the systematic component linked to the probability via the logit."
  },
  "linear_predictor": {
    "definition": "The quantity η = xᵀβ in a GLM, the linear combination of predictors before applying the inverse link function to obtain the conditional mean.",
    "formula": "η = xᵀβ = β₀ + β₁x₁ + ... + βₚxₚ",
    "parameters": null,
    "intuition": "The linear predictor lives on the unrestricted real line — the link function transforms it to the appropriate scale for the mean.",
    "common_confusion": null,
    "example_use": "In Poisson regression, η = log(μ) and μ = exp(η) — predictions must be exponentiated to get the expected count."
  },
  "link_function": {
    "definition": "The function g(·) in a GLM that relates the linear predictor η to the conditional mean μ: g(μ) = η, or equivalently μ = g⁻¹(η).",
    "formula": "g(μ) = η = xᵀβ",
    "parameters": null,
    "intuition": "The link function maps the constrained mean (e.g. a probability in [0,1]) to the unconstrained real line where regression operates.",
    "common_confusion": "The link function links the mean to the linear predictor, not the response to the predictors directly.",
    "example_use": "Logit link: g(p) = log(p/(1-p)) for Binomial; log link: g(μ) = log(μ) for Poisson."
  },
  "deviance": {
    "definition": "A measure of GLM goodness of fit: D = 2[ℓ(saturated model) - ℓ(fitted model)], analogous to residual sum of squares in linear regression.",
    "formula": "D = 2[ℓ(ŷ_sat) - ℓ(ŷ_fit)]",
    "parameters": null,
    "intuition": "Deviance measures how far the fitted model is from a perfect fit — lower deviance means better fit.",
    "common_confusion": "For normal GLMs, deviance equals SSE. For other families, deviance has different formulas but the same interpretation.",
    "example_use": "The likelihood ratio test between nested GLMs uses the difference in deviances, which follows a chi-square distribution."
  },
  "logit_link": {
    "definition": "The link function g(p) = log(p/(1-p)) = logit(p) used in logistic regression to map probabilities to the real line.",
    "formula": "g(p) = log(p/(1-p)),  p = e^η/(1+e^η) = 1/(1+e^{-η})",
    "parameters": null,
    "intuition": "The logit transforms a probability from [0,1] to (-∞, ∞), allowing the full linear predictor to map to valid probabilities.",
    "common_confusion": null,
    "example_use": "In logistic regression, log odds = β₀ + β₁x, so eᵝ¹ is the odds ratio for a unit increase in x."
  },
  "logistic_regression_model": {
    "definition": "A GLM for binary outcomes where the log-odds of the probability is modeled as a linear function of predictors: log(p/(1-p)) = xᵀβ.",
    "formula": "log(p/(1-p)) = β₀ + β₁x₁ + ... + βₚxₚ,  p = 1/(1+e^{-xᵀβ})",
    "parameters": [
      "β: log-odds coefficients; eᵝ is the odds ratio per unit increase in x"
    ],
    "intuition": "Logistic regression bends a linear predictor into an S-shaped probability curve — it is the natural model for binary outcomes.",
    "common_confusion": "Logistic regression coefficients are log odds ratios, not probability differences. Convert by exponentiating for odds ratios.",
    "example_use": "Predicting whether a loan defaults (1) or not (0) from borrower characteristics."
  },
  "poisson_regression_model": {
    "definition": "A GLM for count outcomes where the log of the expected count is modeled as a linear function of predictors: log(μ) = xᵀβ.",
    "formula": "log(μ) = β₀ + β₁x₁ + ... + βₚxₚ,  μ = e^{xᵀβ}",
    "parameters": [
      "β: log rate coefficients; eᵝ is the rate ratio per unit increase in x"
    ],
    "intuition": "Poisson regression models count data using a log link, ensuring predicted counts are always positive.",
    "common_confusion": "Poisson regression assumes the mean equals the variance. Over-dispersion (variance > mean) requires negative binomial regression.",
    "example_use": "Modeling the number of accidents per intersection as a function of traffic volume and road characteristics."
  },
  "gamma_regression_model": {
    "definition": "A GLM for positive continuous outcomes where the response follows a Gamma distribution, typically using a log or inverse link function.",
    "formula": "g(μ) = xᵀβ,  Y ~ Gamma(μ, φ)",
    "parameters": null,
    "intuition": "Gamma regression is appropriate for right-skewed positive data like insurance claims, where the variance grows with the mean.",
    "common_confusion": "Unlike log-transforming Y in linear regression, Gamma regression directly models the non-normal distribution of Y.",
    "example_use": "Modeling insurance claim amounts or hospital lengths of stay."
  },
  "hierarchical_model": {
    "definition": "A model where parameters at one level are themselves modeled as random variables drawn from a higher-level distribution, allowing for nested data structures.",
    "formula": null,
    "parameters": null,
    "intuition": "Hierarchical models handle nested data — students within schools, measurements within patients — by partially pooling information across groups.",
    "common_confusion": "Hierarchical and mixed models are related; both handle grouped data, but hierarchical models emphasize the Bayesian perspective of priors on parameters.",
    "example_use": "Modeling student test scores with school-level random effects to account for within-school correlation."
  },
  "logistic_function": {
    "definition": "The function σ(x) = 1/(1+e^{-x}), mapping any real number to (0,1), used as the inverse logit link in logistic regression.",
    "formula": "σ(x) = 1/(1+e^{-x}) = e^x/(1+e^x)",
    "parameters": null,
    "intuition": "The logistic function produces the S-shaped probability curve in logistic regression — it squashes the entire real line into the (0,1) interval.",
    "common_confusion": "The logistic function is the inverse of the logit: σ(logit(p)) = p and logit(σ(x)) = x.",
    "example_use": "Predicted probabilities in logistic regression are obtained by applying the logistic function to the linear predictor."
  },
  "link_functions": {
    "definition": "The family of monotone differentiable functions used in GLMs to link the conditional mean to the linear predictor.",
    "formula": null,
    "parameters": null,
    "intuition": "Different response types require different link functions — the choice of link determines the scale on which effects are assumed linear.",
    "common_confusion": null,
    "example_use": "Common links: identity (normal), logit (Bernoulli), log (Poisson), inverse (Gamma)."
  },
  "glm_regression_models": {
    "definition": "The class of specific GLM instances defined by choosing a particular exponential family distribution and canonical link function.",
    "formula": null,
    "parameters": null,
    "intuition": "Each GLM regression model is a specific combination of distribution and link — logistic, Poisson, and Gamma regression are the most common.",
    "common_confusion": null,
    "example_use": "Choosing between logistic regression (Bernoulli + logit) and linear probability model (Bernoulli + identity) for binary outcomes."
  },
  "model_fit": {
    "definition": "A measure of how well a statistical model reproduces the observed data, assessed through deviance, likelihood, or residual analysis.",
    "formula": null,
    "parameters": null,
    "intuition": "Model fit answers: how close are the model's predictions to the actual data?",
    "common_confusion": "Good fit on training data does not guarantee good predictive performance on new data — overfitting can give excellent fit with poor generalization.",
    "example_use": "Comparing the deviance of a logistic regression model to a null model to assess overall fit."
  },
  "foundations_of_model_evaluation": {
    "definition": "The framework for assessing how well statistical models explain observed data and generalize to new data, balancing fit and complexity.",
    "formula": null,
    "parameters": null,
    "intuition": "Model evaluation is the discipline of asking 'how good is this model?' — not just for training data, but for future predictions.",
    "common_confusion": null,
    "example_use": "Using AIC, cross-validation, and residual analysis together to evaluate a regression model."
  },
  "goodness_of_fit": {
    "definition": "A measure of how well a model's predictions match the observed data, assessed through statistics like R², deviance, or chi-square tests.",
    "formula": null,
    "parameters": null,
    "intuition": "Goodness of fit quantifies the gap between model predictions and reality — high GOF means the model closely tracks the data.",
    "common_confusion": "Good in-sample fit does not imply good prediction. Overfit models have perfect in-sample fit but poor out-of-sample performance.",
    "example_use": "A Hosmer-Lemeshow test for logistic regression goodness of fit."
  },
  "in_sample_mse": {
    "definition": "The mean squared error computed on the training data: MSE_train = (1/n)Σ(yᵢ - ŷᵢ)², measuring how well the model fits the observed data.",
    "formula": "MSE_train = (1/n)Σᵢ(yᵢ - ŷᵢ)²",
    "parameters": null,
    "intuition": "In-sample MSE measures how well the model explains the data it was fit on — it is optimistic about predictive performance.",
    "common_confusion": "In-sample MSE always decreases as model complexity increases. It is not a reliable guide for model selection.",
    "example_use": "Comparing in-sample MSE across different models to check that adding predictors improves fit."
  },
  "adjusted_r_squared": {
    "definition": "A version of R² that penalizes for the number of predictors: R²_adj = 1 - [(1-R²)(n-1)/(n-p-1)].",
    "formula": "R²_adj = 1 - (1-R²)(n-1)/(n-p-1)",
    "parameters": [
      "n: sample size",
      "p: number of predictors"
    ],
    "intuition": "Adjusted R² penalizes for model complexity — unlike R², it can decrease when uninformative predictors are added.",
    "common_confusion": "Adjusted R² can be negative for very poor models. It is a heuristic, not a formal model selection criterion like AIC.",
    "example_use": "Using adjusted R² to compare regression models with different numbers of predictors."
  },
  "r_squared": {
    "definition": "The coefficient of determination: R² = 1 - SSE/SST, the proportion of variance in Y explained by the regression model.",
    "formula": "R² = 1 - SSE/SST = SSR/SST",
    "parameters": null,
    "intuition": "R² measures the fraction of Y's variation the model explains — higher is better, but more predictors always increases R².",
    "common_confusion": "A high R² does not guarantee a good model — it could reflect overfitting. And low R² does not mean the regression is worthless if the relationships are precisely estimated.",
    "example_use": "R²=0.75 means the predictors explain 75% of the variance in the response."
  },
  "expected_out_of_sample_mse": {
    "definition": "The expected prediction error on new, unseen data: E[(Y_new - ŷ_new)²], decomposable into bias², variance, and irreducible noise.",
    "formula": "E[(Y - f̂(X))²] = [Bias(f̂(X))]² + Var(f̂(X)) + σ²",
    "parameters": null,
    "intuition": "Out-of-sample MSE is the true measure of predictive performance — it penalizes both bias (wrong on average) and variance (inconsistent).",
    "common_confusion": "In-sample MSE is always ≤ out-of-sample MSE. The gap between them measures overfitting.",
    "example_use": "Estimated via cross-validation when the true out-of-sample MSE cannot be computed."
  },
  "generalization_error": {
    "definition": "The error of a model on new, unseen data — the expected loss when the model is applied to the true data-generating distribution.",
    "formula": null,
    "parameters": null,
    "intuition": "Generalization error is the ultimate measure of model quality — it captures how well the model will perform in the real world.",
    "common_confusion": "Low training error does not guarantee low generalization error. Only out-of-sample evaluation (test set or CV) measures generalization.",
    "example_use": "A model with 2% training error and 20% test error has poor generalization due to overfitting."
  },
  "parsimony_principle": {
    "definition": "The principle that, among models with similar predictive performance, the simpler model should be preferred — also known as Occam's razor.",
    "formula": null,
    "parameters": null,
    "intuition": "Parsimony says don't add complexity without a payoff — simpler models generalize better and are easier to interpret.",
    "common_confusion": null,
    "example_use": "Choosing a 3-predictor model over a 10-predictor model when both have similar cross-validated MSE."
  },
  "overfitting": {
    "definition": "The phenomenon where a model fits the training data too closely, capturing noise rather than the true signal, leading to poor performance on new data.",
    "formula": null,
    "parameters": null,
    "intuition": "An overfit model has memorized the training data — it performs perfectly in-sample but fails on new data because it learned the noise.",
    "common_confusion": "Overfitting is a property of the model-data relationship, not the model alone. The same model may overfit with n=20 but not with n=2000.",
    "example_use": "A polynomial of degree n-1 perfectly fits n data points but wildly oscillates between them."
  },
  "penalty_term": {
    "definition": "A term added to an objective function (like AIC's 2p or ridge regression's λΣβⱼ²) that penalizes model complexity to discourage overfitting.",
    "formula": null,
    "parameters": null,
    "intuition": "Penalty terms impose a cost for complexity — they force the model to justify each additional parameter with improved fit.",
    "common_confusion": "Different penalty terms lead to different model selection criteria. AIC uses 2p, BIC uses log(n)·p.",
    "example_use": "The 2p penalty in AIC penalizes each additional parameter by 2 units of log-likelihood."
  },
  "model_diagnostics": {
    "definition": "Statistical and graphical tools for detecting violations of model assumptions, identifying influential observations, and assessing overall model adequacy.",
    "formula": null,
    "parameters": null,
    "intuition": "Model diagnostics are the quality checks before drawing conclusions — they reveal whether the model is a valid description of the data.",
    "common_confusion": null,
    "example_use": "Residual plots, QQ-plots, leverage plots, and Cook's distance together form a comprehensive diagnostic suite."
  },
  "leverage_diagnostic": {
    "definition": "The use of leverage values hᵢᵢ from the hat matrix to identify observations with unusual predictor values that may unduly influence the fit.",
    "formula": "Flag if hᵢᵢ > 2(p+1)/n",
    "parameters": null,
    "intuition": "High-leverage diagnostics identify observations that sit far out in predictor space — they have the potential to pull the fitted model toward themselves.",
    "common_confusion": null,
    "example_use": "Plotting leverage values to identify observations that may disproportionately influence regression estimates."
  },
  "correlation_matrix_inspection": {
    "definition": "The examination of pairwise correlations among predictors to detect potential multicollinearity before fitting a regression model.",
    "formula": null,
    "parameters": null,
    "intuition": "High pairwise correlations (|r| > 0.7 or 0.8) are early warnings of multicollinearity that could destabilize coefficient estimates.",
    "common_confusion": "Multicollinearity can exist without high pairwise correlations (exact relationship among three or more variables). VIF provides a more complete diagnosis.",
    "example_use": "Computing the correlation matrix of all predictors before building a multiple regression model."
  },
  "model_selection": {
    "definition": "The process of choosing among competing statistical models based on criteria that balance goodness of fit against model complexity.",
    "formula": null,
    "parameters": null,
    "intuition": "Model selection is about finding the simplest model that explains the data well — avoiding both underfitting and overfitting.",
    "common_confusion": "No single model selection criterion is universally best. AIC targets predictive accuracy; BIC targets the true model.",
    "example_use": "Using AIC to compare 5 candidate regression models with different predictor sets."
  },
  "information_criteria": {
    "definition": "Model selection statistics derived from the log-likelihood penalized for complexity, including AIC and BIC.",
    "formula": null,
    "parameters": null,
    "intuition": "Information criteria provide a single number summarizing the tradeoff between fit and complexity — lower is better.",
    "common_confusion": "AIC and BIC are only meaningful for comparisons within the same dataset. They cannot be compared across datasets or different response variables.",
    "example_use": "Selecting the best subset of predictors by comparing AIC values across candidate models."
  },
  "akaike_information_criterion": {
    "definition": "A model selection criterion: AIC = -2ℓ(θ̂) + 2p, penalizing log-likelihood by twice the number of parameters.",
    "formula": "AIC = -2ℓ(θ̂) + 2p",
    "parameters": [
      "ℓ(θ̂): maximized log-likelihood",
      "p: number of parameters"
    ],
    "intuition": "AIC estimates expected out-of-sample prediction error — it penalizes complexity just enough to select the best predictive model.",
    "common_confusion": "AIC is designed for predictive accuracy; BIC is designed for model identification. For large n, BIC selects sparser models than AIC.",
    "example_use": "Model with AIC=245 is preferred over model with AIC=263, all else equal."
  },
  "bayesian_information_criterion": {
    "definition": "A model selection criterion: BIC = -2ℓ(θ̂) + p·log(n), with a stronger penalty for parameters than AIC, especially for large n.",
    "formula": "BIC = -2ℓ(θ̂) + p·log(n)",
    "parameters": [
      "p: number of parameters",
      "n: sample size"
    ],
    "intuition": "BIC's larger penalty for complexity relative to AIC means it tends to select simpler models — it targets the true model rather than the best predictor.",
    "common_confusion": "For n > 8, log(n) > 2 so BIC penalizes additional parameters more heavily than AIC, selecting sparser models.",
    "example_use": "In a large dataset, BIC may prefer a 3-predictor model while AIC prefers a 5-predictor model."
  },
  "mallows_cp": {
    "definition": "A model selection criterion for linear regression: Cₚ = SSEₚ/σ̂² - n + 2p, where models with Cₚ ≈ p are considered adequate.",
    "formula": "Cₚ = SSEₚ/σ̂² - n + 2p",
    "parameters": [
      "SSEₚ: residual sum of squares for p-predictor model",
      "σ̂²: estimated error variance from full model"
    ],
    "intuition": "Mallows' Cₚ measures total mean squared error of predictions — models with Cₚ close to the number of parameters have acceptable bias.",
    "common_confusion": null,
    "example_use": "Plotting Cₚ vs p for all subsets and selecting models where Cₚ ≈ p."
  },
  "all_subsets_regression": {
    "definition": "A model selection procedure that fits every possible subset of predictors and selects the best model by some criterion (AIC, BIC, Cₚ, adjusted R²).",
    "formula": null,
    "parameters": null,
    "intuition": "All subsets regression exhaustively evaluates every possible model — it finds the global optimum but is computationally infeasible for many predictors.",
    "common_confusion": "With p predictors there are 2ᵖ subsets. All subsets becomes infeasible for p > 20-30 without specialized algorithms.",
    "example_use": "With 10 predictors, all subsets regression evaluates 2¹⁰ = 1024 models."
  },
  "stepwise_selection": {
    "definition": "An automated model selection procedure that adds or removes predictors one at a time based on a criterion like AIC or p-value threshold.",
    "formula": null,
    "parameters": null,
    "intuition": "Stepwise selection navigates the model space greedily — it is fast but not guaranteed to find the global optimum.",
    "common_confusion": "Stepwise selection based on p-values inflates Type I error and produces confidence intervals that are too narrow — use AIC-based selection instead.",
    "example_use": "Forward stepwise selection starts with no predictors and adds the most significant one at each step."
  },
  "forward_stepwise_selection": {
    "definition": "A stepwise selection procedure that starts with no predictors and iteratively adds the predictor most improving a model selection criterion.",
    "formula": null,
    "parameters": null,
    "intuition": "Forward selection builds the model up from nothing — at each step it asks 'which predictor helps most?'",
    "common_confusion": "Forward selection cannot remove a predictor once added, even if it becomes redundant when later predictors are included.",
    "example_use": "Starting with an intercept-only model and iteratively adding predictors based on AIC improvement."
  },
  "backward_stepwise_selection": {
    "definition": "A stepwise selection procedure that starts with all predictors and iteratively removes the predictor whose removal least worsens a model selection criterion.",
    "formula": null,
    "parameters": null,
    "intuition": "Backward selection prunes the full model — at each step it asks 'which predictor contributes least?'",
    "common_confusion": "Backward selection requires fitting the full model, which may be impossible if p > n.",
    "example_use": "Starting with all 15 predictors and removing the least significant one at each step until AIC stops improving."
  },
  "anova_model_comparison": {
    "definition": "The use of an ANOVA F-test to compare the fit of two nested regression models, testing whether the additional parameters in the larger model significantly improve fit.",
    "formula": "F = [(SSE_reduced - SSE_full)/(df_full - df_reduced)] / [SSE_full/df_full]",
    "parameters": null,
    "intuition": "ANOVA model comparison asks: do the extra predictors in the larger model explain significantly more variation than expected by chance?",
    "common_confusion": "ANOVA comparison only works for nested models — one model must be a special case of the other.",
    "example_use": "Testing whether adding 3 interaction terms to a regression model significantly improves fit."
  },
  "f_test_for_nested_models": {
    "definition": "A hypothesis test comparing two nested linear regression models using an F-statistic based on the difference in residual sums of squares.",
    "formula": "F = [(SSE_R - SSE_F)/q] / [SSE_F/(n-p-1)]  ~  F(q, n-p-1)",
    "parameters": [
      "q: number of additional parameters in the full model",
      "SSE_R, SSE_F: residual SS for reduced and full models"
    ],
    "intuition": "The nested F-test checks whether the extra predictors in the full model explain enough additional variance to justify their inclusion.",
    "common_confusion": null,
    "example_use": "Testing whether a set of demographic controls significantly improves a regression model for wages."
  },
  "resampling": {
    "definition": "The process of repeatedly drawing samples from an existing dataset to estimate sampling distributions, model performance, or confidence intervals.",
    "formula": null,
    "parameters": null,
    "intuition": "Resampling uses the data itself to simulate what repeated sampling from the population would look like.",
    "common_confusion": null,
    "example_use": "Bootstrap resampling and cross-validation are the two main resampling techniques in statistics."
  },
  "data_splitting": {
    "definition": "The partition of a dataset into training and test sets to provide an unbiased estimate of out-of-sample prediction error.",
    "formula": null,
    "parameters": null,
    "intuition": "Holding out a test set before fitting creates an unbiased evaluation — the model never sees the test data during training.",
    "common_confusion": "The test set must be set aside before any modeling decisions are made, including preprocessing. Otherwise the evaluation is optimistic.",
    "example_use": "Splitting 1000 observations into 800 training and 200 test observations for model evaluation."
  },
  "cross_validation": {
    "definition": "A resampling method for estimating out-of-sample prediction error by repeatedly fitting the model on subsets of the data and evaluating on the remaining subset.",
    "formula": null,
    "parameters": null,
    "intuition": "Cross-validation makes every observation serve as both training and test data — it gives a more stable estimate of generalization error than a single split.",
    "common_confusion": "Cross-validation estimates prediction error for the model-building procedure, not for a single fixed model. The procedure includes all preprocessing steps.",
    "example_use": "10-fold cross-validation estimates the prediction error of a ridge regression model."
  },
  "k_fold_cross_validation": {
    "definition": "Cross-validation that divides data into k equal folds, trains on k-1 folds and tests on the remaining fold, repeating k times and averaging test errors.",
    "formula": "CV_k = (1/k)Σⱼ MSE_j",
    "parameters": [
      "k: number of folds (common values: 5 or 10)"
    ],
    "intuition": "Each observation is used for testing exactly once — k-fold CV makes efficient use of the data compared to a single train/test split.",
    "common_confusion": "Smaller k (like 5) has higher bias but lower variance in the CV estimate. Larger k (like n, LOOCV) has lower bias but higher variance.",
    "example_use": "5-fold CV splits 500 observations into 5 groups of 100, cycling through each as the test set."
  },
  "leave_one_out_cross_validation": {
    "definition": "Cross-validation where k equals n — each observation is held out once, the model is fit on n-1 observations, and error is computed on the single held-out observation.",
    "formula": "LOOCV = (1/n)Σᵢ(yᵢ - ŷ₍₋ᵢ₎)²",
    "parameters": null,
    "intuition": "LOOCV makes maximum use of data for training at the cost of fitting n separate models — computationally expensive but low bias.",
    "common_confusion": "For linear regression, LOOCV can be computed in closed form from a single fit using the hat matrix: LOOCV = (1/n)Σ[eᵢ/(1-hᵢᵢ)]².",
    "example_use": "LOOCV is practical for linear regression but expensive for nonlinear models with large n."
  },
  "prediction_error": {
    "definition": "The error made when predicting a new outcome: (Y_new - ŷ_new), with expected squared prediction error = Var(Y) + Var(ŷ) + Bias²(ŷ).",
    "formula": "E[(Y_new - ŷ_new)²] = σ² + Var(ŷ_new) + Bias²(ŷ_new)",
    "parameters": null,
    "intuition": "Prediction error has three sources: irreducible noise (σ²), estimation variance, and bias — only the last two can be reduced by the modeler.",
    "common_confusion": "Even a perfect model has irreducible prediction error σ² due to the noise in the response.",
    "example_use": "The expected prediction error for a new observation in linear regression is σ²(1 + xₙₑw^ᵀ(XᵀX)⁻¹xₙₑw)."
  },
  "model_complexity": {
    "definition": "A measure of how flexible a model is, related to the number of free parameters, the degree of nonlinearity, or the capacity to fit complex patterns.",
    "formula": null,
    "parameters": null,
    "intuition": "More complex models can fit more patterns but risk overfitting — complexity is what you trade for fit.",
    "common_confusion": "Model complexity and model quality are not the same. A complex model is not necessarily a good model.",
    "example_use": "A degree-10 polynomial has higher complexity than a linear model and will fit training data better but may generalize worse."
  },
  "stepwise_selection_methods": {
    "definition": "The family of automated predictor selection algorithms — forward, backward, and combined — that iteratively add or remove predictors to optimize a criterion.",
    "formula": null,
    "parameters": null,
    "intuition": "Stepwise methods navigate the exponentially large model space using a greedy heuristic — fast but not globally optimal.",
    "common_confusion": "Stepwise selection based on p-values does not control family-wise error rate and should be avoided for inference. Use it for exploratory model building only.",
    "example_use": "Combined forward-backward stepwise selection using AIC as the selection criterion."
  },
  "subset_selection_methods": {
    "definition": "Model selection approaches that choose the best subset of predictors from the full set, including all subsets, forward, backward, and best subset selection.",
    "formula": null,
    "parameters": null,
    "intuition": "Subset selection finds the most relevant predictors by explicitly evaluating models with different predictor combinations.",
    "common_confusion": null,
    "example_use": "Best subset selection (via Leaps-and-bounds algorithm) finds the optimal k-predictor model for each k."
  },
  "hypothesis_based_model_comparison": {
    "definition": "The use of formal hypothesis tests (F-tests, likelihood ratio tests) to compare nested statistical models.",
    "formula": null,
    "parameters": null,
    "intuition": "Hypothesis-based comparison asks whether the more complex model is significantly better — it provides a principled way to decide between nested models.",
    "common_confusion": "Hypothesis tests compare nested models only. AIC/BIC can compare non-nested models.",
    "example_use": "Using an F-test to decide whether to include a set of interaction terms in a regression model."
  },
  "resampling_and_validation": {
    "definition": "The family of methods that use data resampling (bootstrap, cross-validation) or data splitting to estimate model performance and uncertainty.",
    "formula": null,
    "parameters": null,
    "intuition": "Resampling and validation methods are the modern alternative to purely analytical inference — they work for any model without distributional assumptions.",
    "common_confusion": null,
    "example_use": "Using 10-fold CV to estimate prediction error and bootstrap to get confidence intervals for model coefficients."
  },
  "cp_based_selection": {
    "definition": "Model selection using Mallows' Cₚ statistic to identify subsets of predictors that minimize total mean squared prediction error.",
    "formula": null,
    "parameters": null,
    "intuition": "Cₚ-based selection aims to minimize prediction error by balancing model fit and the number of predictors.",
    "common_confusion": null,
    "example_use": "Plotting Cₚ against p to identify the 'elbow' where adding more predictors no longer reduces prediction error."
  },
  "hypothesis": {
    "definition": "A statement about the value or range of a population parameter that can be evaluated using statistical evidence from data.",
    "formula": null,
    "parameters": null,
    "intuition": "A hypothesis is a specific, testable claim about the world — statistical testing provides a formal procedure for evaluating it.",
    "common_confusion": "Statistical hypotheses are about population parameters, not about the sample. The sample is used to evaluate, not define, the hypothesis.",
    "example_use": "H₀: μ = 0 is a hypothesis that the population mean is zero."
  },
  "likelihood_based_inference": {
    "definition": "The framework for statistical inference in which the likelihood function serves as the primary source of information about unknown parameters.",
    "formula": null,
    "parameters": null,
    "intuition": "Likelihood-based inference says that all evidence about θ from the data is contained in the likelihood function L(θ; x).",
    "common_confusion": null,
    "example_use": "MLE, likelihood ratio tests, and profile likelihood confidence intervals are all tools of likelihood-based inference."
  },
  "variables_in_regression": {
    "definition": "The distinction between dependent variables (response, what is being explained) and independent variables (predictors, what does the explaining) in a regression model.",
    "formula": null,
    "parameters": null,
    "intuition": "Understanding which variable is the response and which are predictors is the first step in any regression analysis.",
    "common_confusion": "The labels 'dependent' and 'independent' refer to modeling roles, not causal relationships. Regression describes association, not causation.",
    "example_use": "In a wage regression: salary is the dependent variable; education, experience, and region are independent variables."
  }
};
