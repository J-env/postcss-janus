const input1 = `.example {
  background-color: #FFF;
  background-image: url("/folder/subfolder/icons/ltr/chevron.png");
  border-radius: 0 2px 0 8px;
  color: #666;
  padding-right: 20px;
  text-align: left;
  transform: translate(-50%, 50%);
  width: 100%;
}`;

const output1 = `.example {
  background-color: #FFF;
  background-image: url("/folder/subfolder/icons/ltr/chevron.png");
  border-radius: 2px 0 8px 0;
  color: #666;
  padding-left: 20px;
  text-align: right;
  transform: translate(50%, 50%);
  width: 100%;
}`;

const input2 = `/* @noflip */
.example {
  background-color: #FFF;
  background-image: url("/folder/subfolder/icons/ltr/chevron.png");
  border-radius: 0 2px 0 8px;
  color: #666;
  padding-right: 20px;
  text-align: left;
  transform: translate(-50%, 50%);
  width: 100%;
}`;

const output2 = `.example {
  background-color: #FFF;
  background-image: url("/folder/subfolder/icons/ltr/chevron.png");
  border-radius: 0 2px 0 8px;
  color: #666;
  padding-right: 20px;
  text-align: left;
  transform: translate(-50%, 50%);
  width: 100%;
}`;

const input3 = `.example {
  background-color: #FFF;
  background-image: url("/folder/subfolder/icons/ltr/chevron.png");
  border-radius: 0 2px 0 8px;
  color: #666;
  /* @noflip */
  padding-right: 20px;
  text-align: left;
  transform: translate(-50%, 50%);
  width: 100%;
}`;

const output3 = `.example {
  background-color: #FFF;
  background-image: url("/folder/subfolder/icons/ltr/chevron.png");
  border-radius: 2px 0 8px 0;
  color: #666;
  padding-right: 20px;
  text-align: right;
  transform: translate(50%, 50%);
  width: 100%;
}`;

const input4 = `.example {
  background-color: #FFF;
  /* @transformDirInUrl */
  background-image: url("/folder/subfolder/icons/ltr/chevron.png");
  border-radius: 0 2px 0 8px;
  color: #666;
  padding-right: 20px;
  text-align: left;
  transform: translate(-50%, 50%);
  width: 100%;
}`;

const output4 = `.example {
  background-color: #FFF;
  background-image: url("/folder/subfolder/icons/rtl/chevron.png");
  border-radius: 2px 0 8px 0;
  color: #666;
  padding-left: 20px;
  text-align: right;
  transform: translate(50%, 50%);
  width: 100%;
}`;

module.exports = [
  {
    name: 'Default functionality with no options', 
    input: input1, 
    output: output1, 
    options: {}
  },
  {
    name: 'Using the @noflip directive in the selector', 
    input: input2, 
    output: output2, 
    options: {}
  },
  {
    name: 'Using the @noflip directive in a property', 
    input: input3, 
    output: output3, 
    options: {}
  },
  {
    name: 'Using @transformDirInUrl directive in a property', 
    input: input4, 
    output: output4, 
    options: {}
  }
];
