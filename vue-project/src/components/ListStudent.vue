<template>
    <div>
      <div class="container-xl">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>Quản lý <b>sinh viên</b></h2>
                </div>
                <div class="col-sm-6">
                  <button @click="showCreateForm" class="btn btn-success">
                    <i class="material-icons">&#xE147;</i>
                    <span>Thêm mới sinh viên</span>
                  </button>
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                   Id
                  </th>
                  <th>Tên sinh viên</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.id">
                  <td>{{student.id}}</td>
                  <td>{{ student.student_name }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.address }}</td>
                  <td>{{ student.phone }}</td>
                  <td>
                    <button @click="showEditForm(student)" class="edit" aria-label="Edit">
                      <i class="material-icons" title="Edit">&#xE254;</i>
                    </button>
                    <button @click="confirmDelete(student.id)" class="delete" aria-label="Delete">
                      <i class="material-icons" title="Delete">&#xE872;</i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="clearfix">
              <div class="hint-text">Hiển thị <b>{{ students.length }}</b>/<b>{{ totalStudents }}</b> bản ghi</div>
              <ul class="pagination">
                <li class="page-item disabled"><a href="#">Trước</a></li>
                <li class="page-item" v-for="n in totalPages" :key="n">
                  <a href="#" class="page-link">{{ n }}</a>
                </li>
                <li class="page-item"><a href="#">Sau</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div id="addEmployeeModal" class="modal fade" v-show="showAddModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form @submit.prevent="addStudent">
              <div class="modal-header">
                <h4 class="modal-title">Thêm mới sinh viên</h4>
                <button type="button" class="close" @click="showAddModal = false">&times;</button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Tên sinh viên</label>
                  <input type="text" v-model="newStudent.student_name" class="form-control" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" v-model="newStudent.email" class="form-control" required>
                </div>
                <div class="form-group">
                  <label>Địa chỉ</label>
                  <textarea v-model="newStudent.address" class="form-control" required></textarea>
                </div>
                <div class="form-group">
                  <label>Số điện thoại</label>
                  <input type="text" v-model="newStudent.phone" class="form-control" required>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" @click="showAddModal = false">Hủy</button>
                <button type="submit" class="btn btn-success">Thêm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <div id="editEmployeeModal" class="modal fade" v-show="showEditModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form @submit.prevent="updateStudent">
              <div class="modal-header">
                <h4 class="modal-title">Sửa thông tin sinh viên</h4>
                <button type="button" class="close" @click="showEditModal = false">&times;</button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Tên sinh viên</label>
                  <input type="text" v-model="currentStudent.student_name" class="form-control" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" v-model="currentStudent.email" class="form-control" required>
                </div>
                <div class="form-group">
                  <label>Địa chỉ</label>
                  <textarea v-model="currentStudent.address" class="form-control" required></textarea>
                </div>
                <div class="form-group">
                  <label>Số điện thoại</label>
                  <input type="text" v-model="currentStudent.phone" class="form-control" required>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" @click="showEditModal = false">Thoát</button>
                <button type="submit" class="btn btn-info">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <div id="deleteEmployeeModal" class="modal fade" v-show="showDeleteModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form @submit.prevent="deleteStudent">
              <div class="modal-header">
                <h4 class="modal-title">Xóa sinh viên</h4>
                <button type="button" class="close" @click="showDeleteModal = false">&times;</button>
              </div>
              <div class="modal-body">
                <p>Bạn chắc chắn muốn xóa sinh viên {{ currentStudent.student_name }}?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" @click="showDeleteModal = false">Hủy</button>
                <button type="submit" class="btn btn-danger">Xóa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const newStudent = ref({
  student_name: '',
  email: '',
  address: '',
  phone: '',
});

const students = computed(() => store.state.students);
const totalStudents = computed(() => store.state.totalStudents);
const showAddModal = computed(() => store.state.showAddModal);
const showEditModal = computed(() => store.state.showEditModal);
const showDeleteModal = computed(() => store.state.showDeleteModal);
const currentStudent = computed(() => store.state.currentStudent);

const toggleAddModal = () => {
  store.commit('TOGGLE_ADD_MODAL');
  if (showAddModal.value) {
    newStudent.value = { student_name: '', email: '', address: '', phone: '' }; // Reset on open
  }
};

const toggleEditModal = () => {
  store.commit('TOGGLE_EDIT_MODAL');
};

const toggleDeleteModal = () => {
  store.commit('TOGGLE_DELETE_MODAL');
};

const addStudent = async () => {
  await store.dispatch('addStudent', newStudent.value);
  toggleAddModal();
};

const showEditForm = (student) => {
  store.commit('SET_CURRENT_STUDENT', student);
  toggleEditModal();
};

const updateStudent = async () => {
  await store.dispatch('updateStudent', currentStudent.value);
  toggleEditModal();
};

const confirmDelete = (studentId) => {
  const studentToDelete = students.value.find(s => s.id === studentId);
  store.commit('SET_CURRENT_STUDENT', studentToDelete);
  toggleDeleteModal();
};

const deleteStudent = async () => {
  await store.dispatch('deleteStudent', currentStudent.value.id);
  toggleDeleteModal();
};

onMounted(() => {
  store.dispatch('fetchStudents');
});
</script>
  
 
<style scoped>
body {
    color: #566787;
    background: #f5f5f5;
    font-family: 'Varela Round', sans-serif;
    font-size: 13px;
}

.table-responsive {
    margin: 30px 0;
}

.table-wrapper {
    background: #fff;
    padding: 20px 25px;
    border-radius: 3px;
    min-width: 1000px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.table-title {
    padding-bottom: 15px;
    background: #435d7d;
    color: #fff;
    padding: 16px 30px;
    min-width: 100%;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}

.table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
}

.table-title .btn-group {
    float: right;
}

.table-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    outline: none !important;
    margin-left: 10px;
    background-color: #2196F3; /* Primary button color */
    padding: 8px 12px; /* Add padding */
    transition: background-color 0.3s ease; /* Smooth transition */
}

.table-title .btn:hover {
    background-color: #1976D2; /* Darker shade on hover */
}

.table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
}

.table-title .btn span {
    float: left;
    margin-top: 2px;
}

table.table tr th,
table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
}

table.table tr th:first-child {
    width: 60px;
}

table.table tr th:last-child {
    width: 100px;
}

table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
}

table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
}

table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}

table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
}

table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
    outline: none !important;
}

table.table td a:hover {
    color: #2196F3;
}

table.table td a.edit {
    color: #FFC107;
}

table.table td a.delete {
    color: #F44336;
}

table.table td i {
    font-size: 19px;
}

table.table .avatar {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}



.hint-text {
    float: left;
    margin-top: 10px;
    font-size: 13px;
}

.custom-checkbox {
    position: relative;
}

.custom-checkbox input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    margin: 5px 0 0 3px;
    z-index: 9;
}

.custom-checkbox label:before {
    width: 18px;
    height: 18px;
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    background: white;
    border: 1px solid #bbb;
    border-radius: 2px;
    box-sizing: border-box;
    z-index: 2;
}

.custom-checkbox input[type="checkbox"]:checked + label:after {
    content: '';
    position: absolute;
    left: 6px;
    top: 3px;
    width: 6px;
    height: 11px;
    border: solid #000;
    border-width: 0 3px 3px 0;
    transform: rotateZ(45deg);
    z-index: 3;
}

.custom-checkbox input[type="checkbox"]:checked + label:before {
    border-color: #03A9F4;
    background: #03A9F4;
}

.custom-checkbox input[type="checkbox"]:checked + label:after {
    border-color: #fff;
}

.custom-checkbox input[type="checkbox"]:disabled + label:before {
    color: #b8b8b8;
    cursor: auto;
    box-shadow: none;
    background: #ddd;
}

/* Modal styles */
.modal .modal-dialog {
    max-width: 400px;
}

.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
    padding: 20px 30px;
}

.modal .modal-content {
    border-radius: 3px;
    font-size: 14px;
}

.modal .modal-footer {
    background: #ecf0f1;
    border-radius: 0 0 3px 3px;
}

.modal .modal-title {
    display: inline-block;
}

.modal .form-control {
    border-radius: 2px;
    box-shadow: none;
    border-color: #dddddd;
    padding: 10px; /* Added padding for better input experience */
}

.modal textarea.form-control {
    resize: vertical;
}

.modal .btn {
    border-radius: 2px;
    min-width: 100px;
    background-color: #2196F3; 
    color: #fff; 
    padding: 10px; 
    transition: background-color 0.3s ease; 
}

.modal .btn:hover {
    background-color: #1976D2;
}

.modal form label {
    font-weight: normal;
    margin-bottom: 5px; 
}
.pagination {
    display: flex; 
    justify-content: center; /* Center the pagination */
    margin: 20px 0; /* Add margin for spacing */
}

.pagination li {
    list-style: none; /* Remove default list styling */
}

.pagination li a {
    display: inline-block;
    text-decoration: none; /* Remove underline from links */
    color: #566787; /* Link color */
    padding: 10px 15px; /* Add padding for touch targets */
    margin: 0 5px; /* Margin between pagination items */
    border: 1px solid #ddd; /* Border for buttons */
    border-radius: 4px; /* Rounded corners */
    transition: background-color 0.3s, color 0.3s; /* Smooth transitions */
}

.pagination li a:hover {
    background-color: #2196F3; /* Background on hover */
    color: #fff; /* Text color on hover */
}

.pagination li.active a {
    background-color: #03A9F4; /* Active page background */
    color: #fff; /* Active page text color */
    border-color: #03A9F4; /* Border color for active state */
}

.pagination li.disabled a {
    color: #ccc; /* Disabled links */
    pointer-events: none; /* Prevent interaction */
    border-color: #ddd; /* Border color for disabled state */
}

.pagination li i {
    font-size: 16px; /* Icon size */
    padding-top: 6px; /* Space above icons */
}

/* Responsive styles */
@media (max-width: 600px) {
    .pagination {
        flex-wrap: wrap; /* Allow wrapping on small screens */
    }
    
    .pagination li a {
        padding: 8px 12px; /* Smaller padding on mobile */
        font-size: 12px; /* Smaller text on mobile */
    }
}

</style>
