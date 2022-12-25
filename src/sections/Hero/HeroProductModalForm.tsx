import React, { useState } from 'react';

import { Button, Modal } from '../../components';
import placeholderImg from '../../assets/images/placeholder.png';
import { useCreateHeroProduct } from '../../hooks';

interface Props {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroProductModalForm = ({ setIsFormOpen }: Props) => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageFilePreview, setImageFilePreview] = useState(placeholderImg);

  const closeForm = () => {
    setIsFormOpen(false);

    setTimeout(() => {
      document.body.classList.remove('hide-scrollbar');
    }, 200);
  };

  const { mutate: createHeroProduct } = useCreateHeroProduct(() => {
    closeForm();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      setImageFile(imageFile);
      setImageFilePreview(URL.createObjectURL(imageFile));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) return;
    createHeroProduct({ imageFile });
  };

  const handleCloseForm = (e: React.MouseEvent<Element>) => {
    const target = e.target as Element;

    if (!target.closest('.hero-slider__form')) {
      closeForm();
    }
  };

  return (
    <Modal onClose={handleCloseForm}>
      <form className="hero-slider__form" onSubmit={handleSubmit}>
        <input
          type="file"
          id="imageFile"
          onChange={handleChange}
          className="hidden"
        />
        <label htmlFor="imageFile" className="cursor-pointer">
          <img src={imageFilePreview} alt="" />
        </label>

        <Button className="mt-5 relative left-1/2 -translate-x-1/2">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default HeroProductModalForm;
