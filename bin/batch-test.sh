for i in `seq 10`; do
 npm run test
 if [ $? -ne 0 ];
 then
   exit $?
 fi
done
echo "test run successfully"
exit $?
