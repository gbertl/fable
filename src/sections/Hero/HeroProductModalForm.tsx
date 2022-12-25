import React, { useState } from 'react';

import { Button, Modal } from '../../components';
import placeholderImg from '../../assets/images/placeholder.png';
import { useCreateHeroProduct, useUpdateHeroProduct } from '../../hooks';
import { HeroProduct } from '../../typings.d';
import { useQueryClient } from 'react-query';

interface Props {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentHeroProduct?: HeroProduct;
}

const HeroProductModalForm = ({ setIsFormOpen, currentHeroProduct }: Props) => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageFilePreview, setImageFilePreview] = useState(
    currentHeroProduct?.imageUrl || placeholderImg
  );

  const queryClient = useQueryClient();

  const { mutate: createHeroProduct } = useCreateHeroProduct(() => {
    queryClient.invalidateQueries('heroProducts');
    setImageFile(undefined);
    setImageFilePreview(placeholderImg);
  });

  const { mutate: updateHeroProduct } = useUpdateHeroProduct(() => {
    queryClient.invalidateQueries('heroProducts');
    setImageFile(undefined);
    setImageFilePreview(placeholderImg);
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

    if (currentHeroProduct) {
      const { imageUrl, ...heroProduct } = currentHeroProduct;

      updateHeroProduct({
        id: currentHeroProduct._id,
        heroProduct: { ...heroProduct, imageFile },
      });
    } else {
      createHeroProduct({ imageFile });
    }
  };

  return (
    <Modal setIsOpen={setIsFormOpen}>
      <form onSubmit={handleSubmit}>
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
