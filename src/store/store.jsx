import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  modalType: '',
  style: {},
  title: '',
  content: '',
  openModal: (modalData) => {
    set((state) => ({
      ...state,
      isOpen: true,
      modalType: modalData.modalType,
      style: modalData.style,
      title: modalData.title,
      content: modalData.content,
    }));
  },
  closeModal: () => {
    set((state) => ({
      ...state,
      isOpen: false,
      modalType: '',
    }));
  },
}));


export { useModalStore };
