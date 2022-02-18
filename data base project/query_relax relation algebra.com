group: Example 
company = {
company_name, city
'tsmc', 'Miami'
'htc', 'taipei'
'FirstBank', 'Miami'
}
works = {
person_name, company_name, salary
'chris', 'tsmc', 100000
'josh', 'htc', 2000
'jane', 'FirstBank', 100000
'grace', 'tsmc', 3000
'tim', 'FirstBank', 1000
}

Employee = {
person_name,  street, city
'chris', a1, 'Miami'
'tim', a2, 'taipei'
'josh', a3, 'null'
'jane', a4, 'Miami'
'grace', a5, 'Miami'
}