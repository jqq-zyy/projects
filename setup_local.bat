@echo Prepare to start install, PLS keep network good.
call cnpm install
cd src
git clone https://git.coding.net/billypc025/jslib.git
cd jslib
git checkout -b beta1 origin/beta1
@echo All modules has been installed.
pause;