node('testing') {
    stage( 'Intializing')
    {
        echo 'Intializing ...'
        sh 'echo $(whomai)'
        
    }

    stage('Checkout'){
       echo 'Getting source code'
       checkout scm
    
    }

    // stage('Install Docker'){
    //     echo 'Building docker image'
    //     sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -'
    //     sh 'sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"'
    //     sh 'sudo apt-get update'
    //     sh 'apt-cache policy docker-ce'
    //     sh 'sudo apt-get install -y docker-ce'
    //     sh 'sudo systemctl status docker'
    //        /**
               
    //            docker-machine env
    //            docker build -t nshah/piglatin .
    //            eval $(docker-machine env)
    //            docker build -t nshah/piglatin .
               
    //        */ 
    // }
      stage('Install Docker on Centos node'){
        echo 'Building docker image'
        sh 'sudo yum install docker'
        sh 'sudo yum remove docker docker-common docker-selinux docker-engine'
        sh 'sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo'
        sh 'sudo yum install docker-ce'
           /**
               
               docker-machine env
               docker build -t nshah/piglatin .
               eval $(docker-machine env)
               docker build -t nshah/piglatin .
               
           */ 
    }

    stage('Build Docker'){
        echo 'Building docker image'
           
               
        // sh 'docker-machine env'
        sh ' sudo docker build -t nshah/jira-time-log .'
        // sh 'eval $(docker-machine env)'
        // sh 'docker build -t nshah/piglatin .'
        
        
    }

    stage('Deploy'){

         echo 'Push to Repo'
         /**
            docker run -p 3000:3000 -d nshah/piglatin
         */

    }

    stage('Cleanup'){

         echo 'cleanup'
        
        //  mail body: 'project build successful',
        //              from: 'xxxx@yyyyy.com',
        //              replyTo: 'xxxx@yyyy.com',
        //              subject: 'project build successful',
        //              to: 'yyyyy@yyyy.com'
    }


    stage('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"
          /** for running the jasmine test.
            jasmine
          */

    }
}