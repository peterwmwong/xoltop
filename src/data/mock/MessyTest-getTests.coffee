define ->
  t = (n,c)-> testname:"test#{n}_verifyThis", issuecount:c
  for i in [0..10] then t i,20+i