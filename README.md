nodePerform
===========

easily modified node.js Express app for quick performance comparisons

Testing Locally or on a Server
==============================

Pre-requisites:  Install node and npm first

1. Download source code: git clone https://github.com/DrPaulBrewer/nodePerform.git
2. Change directory:  cd ./nodePerform
3. Install dependencies: npm install
4. Run: PORT=4000 node ./app.js
5. Point Web Browser to: http://localhost:4000 or http://wherever.it.is:4000

Testing on Modulus.io Node/Meteor PaaS
======================================
1. As above, download source code: git clone https://github.com/DrPaulBrewer/nodePerform.git
2. At this point, if you have a modulus.io account, the project create and deploy commands should work fine.
3. Modulus will grab the dependencies itself, you do not need to have node or npm installed locally.


Modifying the Tests
===================
The app.js contains all of the code.

Tests are defined as functions, which get run through a generic "timeit" function.
Test functions can take arbitrary parameters.  The generateResult() function parameterizes
and runs the tests and prepares HTML output which is cached and rate limited to help prevent abuse. 

The existing tests are 1,000,000 ops of basic floating point math, random number generation, and array numeric sorting.

If you want to fork your own copy and change the tests, please provide some information
in the README as to what your tests do.  I am willing to pull useful, short tests into the main branch.






