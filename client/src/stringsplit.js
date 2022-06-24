const materials =
  '* 1/2 x 3/4 inch parting strip\n* 1 x 2 common pine\n* 1 x 4 common pine\n* 1 x 10 common pine\n* 1/4 inch thick lauan plywood\n* Finishing Nails\n* Sandpaper\n* Wood Glue\n* Wood Filler\n* Minwax Oil Based Polyurethane\n';

// is this wise? to have string

// each line break wrap li generate string literal?
function splitMaterials(string) {
  const materials = string;
  const materialsArray = materials.split('\n').map((item) => {
    return `<li>${item}</li>`;
  });

  console.log(materialsArray);
}

splitMaterials(materials);

{
  courseData.description.split('\n').map((paragraphBlock) => {
    return <p>{paragraphBlock}</p>;
  });
}

{
  courseData.materialsNeeded.split('*').map((item) => {
    return <li>{item}</li>;
  });
}
