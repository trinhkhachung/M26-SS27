// src/store.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    students: [],
    totalStudents: 0,
    currentStudent: {},
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
  },
  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
      state.totalStudents = students.length;
    },
    ADD_STUDENT(state, student) {
      state.students.push(student);
      state.totalStudents++;
    },
    UPDATE_STUDENT(state, updatedStudent) {
      const index = state.students.findIndex(student => student.id === updatedStudent.id);
      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    },
    DELETE_STUDENT(state, studentId) {
      state.students = state.students.filter(student => student.id !== studentId);
      state.totalStudents--;
    },
    SET_CURRENT_STUDENT(state, student) {
      state.currentStudent = student;
    },
    TOGGLE_ADD_MODAL(state) {
      state.showAddModal = !state.showAddModal;
    },
    TOGGLE_EDIT_MODAL(state) {
      state.showEditModal = !state.showEditModal;
    },
    TOGGLE_DELETE_MODAL(state) {
      state.showDeleteModal = !state.showDeleteModal;
    },
  },
  actions: {
    async fetchStudents({ commit }) {
      try {
        const response = await axios.get('http://localhost:5001/students');
        commit('SET_STUDENTS', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addStudent({ commit }, student) {
      try {
        const response = await axios.post('http://localhost:5001/students', student);
        commit('ADD_STUDENT', { ...response.data, id: Date.now() }); // Assuming the API returns the student object
      } catch (error) {
        console.error(error);
      }
    },
    async updateStudent({ commit }, student) {
      try {
        await axios.put(`http://localhost:5001/students/${student.id}`, student);
        commit('UPDATE_STUDENT', student);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStudent({ commit }, studentId) {
      try {
        await axios.delete(`http://localhost:5001/students/${studentId}`);
        commit('DELETE_STUDENT', studentId);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export default store;
