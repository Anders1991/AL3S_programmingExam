const createStudentForm = document.getElementById('newStudentForm')
const app = document.getElementById('studentForm')

let request = new XMLHttpRequest()
request.open('GET', 'http://localhost:8080/student', true)

request.onload = function () {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {

        const createStudentNameLegend = document.createElement("p")
        createStudentNameLegend.textContent = "Name:"
        const createStudentName = document.createElement('input')
        createStudentName.setAttribute('id', 'createStudentName')

        const createStudentEmailLegend = document.createElement("p")
        createStudentEmailLegend.textContent = "Email:"
        const createStudentEmail = document.createElement('input')
        createStudentEmail.setAttribute('id', 'createStudentEmail')

        const createStudentSLegend = document.createElement("p")
        createStudentSLegend.textContent = "Supervisor:"
        const createStudentSupervisor = document.createElement('input')
        createStudentSupervisor.setAttribute('id', 'createStudentSupervisor')

        const createBtn = document.createElement("button")
        createBtn.setAttribute('id', ('createBtn'))
        createBtn.textContent = 'Create'

        createStudentForm.appendChild(createStudentNameLegend)
        createStudentForm.appendChild(createStudentName)
        createStudentForm.appendChild(createStudentEmailLegend)
        createStudentForm.appendChild(createStudentEmail)
        createStudentForm.appendChild(createStudentSLegend)
        createStudentForm.appendChild(createStudentSupervisor)
       /* data.forEach((supervisor) => {
            const createStudentSupervisorOption = document.createElement("option")
            createStudentSupervisorOption.setAttribute('value', supervisor.id)
            createStudentSupervisorOption.textContent = supervisor.id
            createStudentSupervisor.appendChild(createStudentSupervisorOption)
        }) */
        createStudentForm.appendChild(createBtn)

        function createStudent() {
            $.ajax({
                url: 'http://localhost:8080/student?name=' + document.getElementById('createStudentName').value + '&email=' + document.getElementById('createStudentEmail').value + '&supervisors=' + document.getElementById('createStudentSupervisor').value,
                type: 'POST',
                // data: {student: student},
                contentType: 'application/json',
                dataType: 'text'
            })
            window.location.reload();
        }

        document.getElementById('createBtn').addEventListener("click", createStudent)


        data.forEach((student) => {

            const studentCard = document.createElement('div')
            studentCard.setAttribute('class','studentCard')

            const StudentId = document.createElement('input')
            StudentId.setAttribute('name','studentId')
            StudentId.setAttribute("value",student.id)
            StudentId.setAttribute('type','hidden')
            StudentId.setAttribute('id', student.id)

            const name = document.createElement('input')
            name.setAttribute("name","name")
            name.setAttribute('id', 'name'+student.id)
            name.setAttribute('value', student.name)

            const email = document.createElement('input')
            email.setAttribute("name","email")
            email.setAttribute('id', 'email'+student.id)
            email.setAttribute('value', student.email)

            const supervisor = document.createElement("input")
            supervisor.setAttribute("name", "supervisor")
            supervisor.setAttribute("id", "supervisor"+student.id)
            supervisor.setAttribute("value", student.supervisors.id)

            const update = document.createElement("button")
            update.setAttribute('method', 'put')
            update.setAttribute('id', 'updatebtn'+student.id)
            update.textContent = "Opdater"

            const deleteStudent = document.createElement("button")
            deleteStudent.setAttribute('id', 'deletebtn'+student.id)
            deleteStudent.setAttribute('method', 'delete')
            deleteStudent.textContent = "Slet"

            app.appendChild(studentCard)
            studentCard.appendChild(StudentId)
            studentCard.appendChild(name)
            studentCard.appendChild(email)
            studentCard.appendChild(supervisor)
            studentCard.appendChild(update)
            studentCard.appendChild(deleteStudent)

            function removeStudentElements() {
                var idobj = document.getElementById(student.id)
                var nameobj = document.getElementById("name" + student.id);
                var emailobj = document.getElementById("email" + student.id);
                var supervisorobj = document.getElementById("supervisor" + student.id);
                var updateobj = document.getElementById("updatebtn" + student.id);
                var deleteobj = document.getElementById("deletebtn" + student.id);
                idobj.remove();
                nameobj.remove();
                emailobj.remove();
                supervisorobj.remove();
                updateobj.remove();
                deleteobj.remove();
            }
/*
            function studentUpdate1() {
                $.ajax({
                    url : "http://localhost:8080/update?id=" +document.getElementById('id') + "&name=" +document.getElementById('name')+"&email="+document.getElementById('commonEmail').value+"&superID="+document.getElementById('commonSuperId').value,
                    type: 'POST',
                    contentType: 'application/json',
                    data: {student: student},
                    dataType: 'text'
                })
            }
*/
            function studentUpdate2() {
                $.ajax({
                    url: 'http://localhost:8080/update?id=' + student.id +'&name=' + document.getElementById('name' + student.id).value + '&email=' + document.getElementById('email'+student.id).value + '&supervisors=' + document.getElementById("supervisor"+student.id).value,
                    type: 'PUT',
                    data: {student: student, id: student.id},
                    contentType: 'application/json',
                    dataType: 'text'
                })
            }

            function studentDelete() {
                $.ajax({
                    url: 'http://localhost:8080/student/' + student.id,
                    type: 'DELETE',
                    data: {student: student},
                    contentType: 'application/json',
                    dataType: 'text'
                })
                removeStudentElements()
            }

            document.getElementById('updatebtn'+student.id).addEventListener("click", studentUpdate2)
            document.getElementById('deletebtn'+student.id).addEventListener("click", studentDelete)
        })
     } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Øv, det virker ikke :(`
        app.appendChild(errorMessage)
    }
}
 request.send()
