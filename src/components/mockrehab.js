const mockRehabItems = [
  {
    title: "Neck Stretching",
    area: "Neck",
    link: "/shop",
    prodimg: "/neckstretcher.avif",
    linkd: "Cervical Neck Stretcher",
    mediaSrc: "https://www.youtube.com/embed/iu5-Y_gEcvA?si=uvugUdI9mX8U4SLU",
    description:
      "Ideal for relaxing and relieving tension in the neck muscles.",
  },
  {
    title: "Neck Massage",
    area: "Neck",
    link: "/shop",
    prodimg: "/massagegun6.avif",
    linkd: "Mini Massage Gun",
    mediaSrc: "https://www.youtube.com/embed/dUKNiJJ0hpE?si=lEmiU2pKXYJQaXh2",

    description:
      "Ideal for relaxing and relieving tension in the neck muscles.",
  },
  {
    title: "Foam Rolling",
    area: "Abdominal",
    linkd: "Core Wheel",
    prodimg: "/corewheel.avif",
    link: "/shop",
    mediaSrc: "https://www.youtube.com/embed/9ZCoAbI7uX0?si=MfsgCFM4idrsamKe",
    description: "Perfect for soothing and strengthening the abdominal area.",
  },
  {
    title: "Foam Rolling",
    area: "other",
    link: "/shop",
    mediaSrc: "/howtoroll.mp4",
    description: "we have selected other due to no matches",
  },
  {
    title: "Shoulder Stretch",
    area: "Shoulders",
    link: "/shop",
    linkd: "Massage Peanut Ball",
    prodimg: "/dualmassage.avif",
    mediaSrc: "https://www.youtube.com/embed/Bia8CHwoQCU?si=Pue5PY6eYoqAFAhI",
    description:
      "Great for loosening tightness and enhancing mobility in the shoulders.",
  },
  {
    title: "Shoulder Massage",
    area: "Shoulders",
    link: "/shop",
    linkd: "Mini Massage Gun",
    prodimg: "/massagegun6.avif",
    mediaSrc: "https://www.youtube.com/embed/BBq34WOZt4M?si=zG-3GtK42r5LfZBN",
    description:
      "Great for loosening tightness and enhancing mobility in the shoulders.",
  },
  {
    title: "Foam Rolling",
    area: "Chest",
    link: "/shop",
    linkd: "Foam Roller",
    prodimg: "/foamroller.avif",
    mediaSrc: "  https://www.youtube.com/embed/MsKMwQDMShc?si=d8RG6hyaKrY2KteP",
    description:
      "Effective in opening up the chest and promoting better posture.",
  },
  {
    title: "Stretch and Strenghten",
    area: "Biceps",
    link: "/shop",
    linkd: "Fabric Resistance Bands",
    prodimg: "/bands3.avif",
    mediaSrc: "https://www.youtube.com/embed/xVOfvb7UX_Y?si=lcjuWqSa5zmBLrAG",
    description:
      "Beneficial for releasing tension and improving flexibility in the biceps.",
  },
  {
    title: "Stretch and Strenghten",
    area: "Biceps",
    link: "/shop",
    linkd: "Resistance Bands",
    prodimg: "/ruberband2.avif",
    mediaSrc: "https://www.youtube.com/embed/LFRNR23FSFE?si=0QWfDhA11pVXz8ze",
    description:
      "Beneficial for releasing tension and improving flexibility in the biceps.",
  },
  {
    title: "Grip Stength",
    area: "Forearm",
    link: "/shop",
    linkd: "Hand Grip Strengthen",
    prodimg: "/handstrength3.avif",
    mediaSrc: "https://www.youtube.com/embed/F_kWKT9IanU?si=vx447FJ_vtDPjc13",
    description:
      "Useful for reducing discomfort and enhancing enhancing strength in the forearms.",
  },
  {
    title: "Forearm Strengthening",
    area: "Forearm",
    link: "/shop",
    linkd: "3 Pack Fabric Bands",
    prodimg: "/bands.png",
    mediaSrc: "https://www.youtube.com/embed/An4zJ_v0mYs?si=aiRaeptvqt5cmiv_",
    description:
      "Useful for reducing discomfort and enhancing strength in the forearms.",
  },
  {
    title: "Hand Strengthen",
    area: "Hands",
    link: "/shop",
    linkd: "Handgrip Strength Trainer",
    prodimg: "/handstrength3.avif",
    mediaSrc: "https://www.youtube.com/embed/F_kWKT9IanU?si=KrHZhCmsCo5-UiXv",
    description:
      "Helpful for relieving stiffness and increasing dexterity in the hands.",
  },
  {
    title: "Hip Mobility",
    area: "Hips",
    link: "/shop",
    mediaSrc: "https://www.youtube.com/embed/O3dzeagyhH8?si=QooQDyu47fBTGg6-",
    linkd: "Resistance Bands Flat Set, 3 Pieces",
    prodimg: "/ruberband2.avif",
    description:
      "Effective in releasing tightness and improving flexibility in the hips.",
  },

  {
    title: "Hip Rolling",
    area: "Hips",
    link: "/shop",
    mediaSrc: "https://www.youtube.com/embed/GgfbyqZULY4?si=niNMjQSKdB8GLVDj",
    linkd: "Foam Roller",
    prodimg: "/foamroller.avif",
    description:
      "Effective in releasing tightness and improving flexibility in the hips.",
  },
  {
    title: "Hip Massage",
    area: "Hips",
    link: "/shop",
    mediaSrc: "https://www.youtube.com/embed/w16GnXTSuaQ?si=D1m1mSeKwj8VxZ6t",
    linkd: "Mini Massage Gun",
    prodimg: "/massagegun6.avif",
    description:
      "Effective in releasing tightness and improving flexibility in the hips.",
  },
  {
    title: "Glute Activation",
    area: "Glutes",
    link: "/shop",
    linkd: "Resistance Band",
    prodimg: "/bands.png",
    mediaSrc: "https://www.youtube.com/embed/vyDCxcMlBGI?si=smQrAwLkGEbEc_hG",
    description:
      "Excellent for reducing soreness and enhancing mobility in the glutes.",
  },
  {
    title: "Glute Rolling",
    area: "Glutes",
    link: "/shop",
    linkd: "Foam Roller",
    prodimg: "/foamroller.avif",
    mediaSrc: "https://www.youtube.com/embed/zSYOUFpDZlk?si=eCILsrmgDSNSCfvb",
    description:
      "Excellent for reducing soreness and enhancing mobility in the glutes.",
  },
  {
    title: "Hip Flexor Stretch",
    area: "Glutes",
    link: "/shop",
    linkd: "Block for Yoga - Cork Material",
    prodimg: "/blockyoga5.avif",
    mediaSrc: "https://www.youtube.com/embed/V1Ho9GFaOf4?si=zR09J9RPITtlsgXh",
    description:
      "Excellent for reducing soreness and enhancing mobility in the glutes.",
  },
  {
    title: "Quadriceps Strengthening",
    area: "Quadriceps",
    link: "/shop",
    linkd: "Resistance Bands Flat Set, 3 Pieces",
    prodimg: "/ruberband2.avif",
    mediaSrc: "https://www.youtube.com/embed/DLVfp-SULNQ?si=U8huOTYiHRT-8bn-",
    description:
      "Perfect for Strengthening and improving flexibility in the quadriceps.",
  },
  {
    title: "Quadriceps Rolling",
    area: "Quadriceps",
    link: "/shop",
    linkd: "Therapy Foam Roller - Black",
    prodimg: "/foamroller.avif",
    mediaSrc: "https://www.youtube.com/embed/1XzS9y-vJD8?si=rpW3mExHf8GuMmPj",
    description:
      "Perfect for Rolling and improving flexibility in the quadriceps.",
  },
  {
    title: "Quadriceps Muscle Relief",
    area: "Quadriceps",
    link: "/shop",
    linkd: "Massage Peanut Ball",
    prodimg: "/dualmassage.avif",
    mediaSrc: "https://www.youtube.com/embed/7Q2Lyfu-wsM?si=6X6UHIh3FTXONju9",
    description:
      "Perfect for Rolling and improving flexibility in the quadriceps.",
  },
  {
    title: "Calf Rolling",
    area: "Calves",
    link: "/shop",
    linkd: "Therapy Foam Roller - Black",
    prodimg: "/foamroller.avif",
    mediaSrc: "https://www.youtube.com/embed/nZZe9ai7Vvw?si=Egu3mR-Wubh-DwMy",
    description:
      "Ideal for reducing tightness and preventing injury in the calves.",
  },
  {
    title: "Calf Massage",
    area: "Calves",
    link: "/shop",
    linkd: "Mini Massage Gun - Matte Black",
    prodimg: "/massagegun.avif",
    mediaSrc: "https://www.youtube.com/embed/Yf0_XM7wztw?si=Q-d9P3npaIbF-rha",
    description:
      "Ideal for reducing tightness and preventing injury in the calves.",
  },
  {
    title: "Shin Massage",
    area: "Shins",
    link: "/shop",
    linkd: "Mini Massage Gun - Matte Black",
    prodimg: "/massagegun.avif",
    mediaSrc: "https://www.youtube.com/embed/FCppY5H83fw?si=lWDXBV6BAHjXt1g7",
    description:
      "Great for alleviating discomfort and improving flexibility in the shins.",
  },
  {
    title: "Shin Rolling",
    area: "Shins",
    link: "/shop",
    linkd: "Foam Roller",
    prodimg: "/foamroller.avif",
    mediaSrc: "https://www.youtube.com/embed/bTw3wGOq99o?si=ERZkcDQ-5UKGeBZF",
    description:
      "Great for alleviating discomfort and improving flexibility in the shins.",
  },
  {
    title: "Feet Rolling",
    area: "Feet",
    link: "/shop",
    linkd: "Massage Peanut Ball",
    prodimg: "/dualmassage.avif",
    mediaSrc: "https://www.youtube.com/embed/jdsW76D7apI?si=vqS6trPfMPPy4jEh",
    description:
      "Excellent for relieving tension and promoting better mobility in the feet.",
  },
];

export default mockRehabItems;
