document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    (async () => {
      const postsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const postsResponseData = await postsResponse.json();
      const postsData = postsResponseData.splice(0, 10);

      const userResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const userResponseData = await userResponse.json();
      const userData = userResponseData.splice(0, 9);

      const photosResponse = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const photosResponseData = await photosResponse.json();
      const photosData = photosResponseData.splice(0, 9);

      const mainUserData = userData.map((user, index) => {
        return {
          ...user,
          photoThumbnailUrl: photosData[index].thumbnailUrl,
          photoUrl: photosData[index].url,
        };
      });

      console.log("------------USER", mainUserData);

      const sliderWrapper = document.getElementById("slider-wrapper");

      postsData.forEach((post) => {
        const slideContainer = document.createElement("div");
        slideContainer.classList.add("card");
        slideContainer.classList.add("swiper-slide");
        sliderWrapper.appendChild(slideContainer);

        const imageContent = document.createElement("div");
        imageContent.classList.add("image-content");
        slideContainer.appendChild(imageContent);

        const overlaySlider = document.createElement("span");
        overlaySlider.classList.add("overlay");
        imageContent.appendChild(overlaySlider);

        const cardImageSlider = document.createElement("div");
        cardImageSlider.classList.add("card-image");
        imageContent.appendChild(cardImageSlider);

        const ImageSlider = document.createElement("img");
        ImageSlider.classList.add("card-image");
        cardImageSlider.appendChild(ImageSlider);

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        slideContainer.appendChild(cardContent);

        const cardContentDescription = document.createElement("p");
        cardContentDescription.classList.add("description");
        cardContentDescription.innerHTML = post.body;
        cardContent.appendChild(cardContentDescription);

        const cardButton = document.createElement("button");
        cardButton.classList.add("button");
        cardButton.innerHTML = "View More";
        cardContent.appendChild(cardButton);
      });

      const teacherBlockWrapper = document.getElementById(
        "teacher-block-wrapper"
      );

      mainUserData.forEach((user) => {
        const teacherBlockCard = document.createElement("div");
        teacherBlockCard.classList.add("teacher-block_card");
        teacherBlockWrapper.appendChild(teacherBlockCard);

        const teacherBlockCardUpperPart = document.createElement("div");
        teacherBlockCardUpperPart.classList.add(
          "teacher-block_card__upper-part"
        );
        teacherBlockCard.appendChild(teacherBlockCardUpperPart);

        const teacherBlockCardUpperPartImg = document.createElement("img");
        teacherBlockCardUpperPartImg.classList.add("img-teacher-avatar");
        teacherBlockCardUpperPartImg.setAttribute(
          "src",
          user.photoThumbnailUrl
        );
        teacherBlockCardUpperPart.appendChild(teacherBlockCardUpperPartImg);

        const englishTeacherpersonalInfoBlock = document.createElement("div");
        englishTeacherpersonalInfoBlock.classList.add(
          "english-teacher-personal-info-block"
        );
        teacherBlockCardUpperPart.appendChild(englishTeacherpersonalInfoBlock);

        const englishTeacherpersonalInfoBlockName =
          document.createElement("div");
        englishTeacherpersonalInfoBlockName.classList.add(
          "english-teacher-personal-info-block_name"
        );
        englishTeacherpersonalInfoBlockName.innerHTML = user.name;
        englishTeacherpersonalInfoBlock.appendChild(
          englishTeacherpersonalInfoBlockName
        );

        const teacherBlockCardMiddlePart = document.createElement("div");
        teacherBlockCardMiddlePart.classList.add(
          "teacher-block_card__middle-part"
        );
        teacherBlockCardMiddlePart.innerHTML =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ducimus aliquid sed molestiae, numquam eveniet magni odit aperiam harum incidunt.Lorem ipsum dolor sit amet consectetur adipisicing elit.";
        teacherBlockCard.appendChild(teacherBlockCardMiddlePart);

        const teacherBlockCardLowerPart = document.createElement("div");
        teacherBlockCardLowerPart.classList.add(
          "teacher-block_card__lower-part"
        );
        teacherBlockCard.appendChild(teacherBlockCardLowerPart);

        const buttonTrialLesson = document.createElement("button");
        buttonTrialLesson.classList.add("button-trial-lesson");
        buttonTrialLesson.innerHTML = "Book trial lesson";

        buttonTrialLesson.addEventListener("click", () => {
          const newWindow = window.open(
            `https://jsonplaceholder.typicode.com/users/${user.id}`,
            "_blank"
          );
        });
        teacherBlockCardLowerPart.appendChild(buttonTrialLesson);
      });

      new Swiper(".slide-content", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        centerSlide: "true",
        fade: "true",
        grabCursor: "true",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
          950: {
            slidesPerView: 3,
          },
        },
      });
    })();
  }
};
