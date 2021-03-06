﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KusumgarBusinessEntities;
using KusumgarDataAccess;
using KusumgarBusinessEntities.Common;

namespace KusumgarModel
{
   public class TestUnitManager
    {
       public List<TestUnitInfo> Get_Test_Units(ref PaginationInfo pager)
        {
            List<TestUnitInfo> testUnit = new List<TestUnitInfo>();

            TestUnitRepo tRepo = new TestUnitRepo();

            testUnit = tRepo.Get_Test_Units(ref pager);

            return testUnit;
        }

       public void Insert(TestUnitInfo testUnit)
        {
            TestUnitRepo tRepo = new TestUnitRepo();
            
            tRepo.Insert(testUnit);
        }

       public TestUnitInfo Get_Test_Unit_By_Id(int testUnitId)
        {
            TestUnitInfo testUnit = new TestUnitInfo();
            
            TestUnitRepo tRepo = new TestUnitRepo();
            
             testUnit = tRepo.Get_Test_Unit_By_Id(testUnitId);
            
             return testUnit;
        }

        public void Update(TestUnitInfo testUnit)
        {
            TestUnitRepo tRepo = new TestUnitRepo();
            
            tRepo.Update(testUnit);
        }

        public List<AutocompleteInfo> Get_Test_Unit_AutoComplete(string test_Unit_Name)
        {
            TestUnitRepo tRepo = new TestUnitRepo();

             return tRepo.Get_Test_Unit_AutoComplete(test_Unit_Name);
            
        }

        public List<TestUnitInfo> Get_Test_Unit_By_Name(string testUnitName, ref PaginationInfo pager)
        {
            List<TestUnitInfo> testUnits = new List<TestUnitInfo>();

            TestUnitRepo tRepo = new TestUnitRepo();

            testUnits = tRepo.Get_Test_Unit_By_Name(testUnitName, ref pager);

            return testUnits;
        }
    }
}
