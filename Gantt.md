gantt
       dateFormat  2017-11-07
       title  GANTT diagram for my carPool Application

       section   Tasks

       Code and Documentation                    :active,  des, 2017-15-12, 35d
       Testing carPool              :  active,   des2, after des1, 14d
       Thesis              :    active,    des3, after des2, 60d

       section Critical tasks
       Completed task in the critical line :crit, done, 2018-28-02,60d
              Code and Documentation          :crit, done, after des1, 37d
       Create and run tests for carPool             :crit, active, 14d
      Write Thesis        :crit, 21d



       section Documentation
       Preparation for Project             :active, a1, after des1, 3d
        Ionic framework      :after a1  , 3d
        Algorithms  :doc1, after a1  , 3d


       code implementation               :after doc1, 5d
       Running   Application    :1w
       Final Thesis    :3w
