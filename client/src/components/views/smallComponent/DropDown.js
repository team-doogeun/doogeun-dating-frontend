// legacy code..

// import React from 'react'

/*{ <div className="ageDropDown" ref={dropDownRef}>
            <select
              value={age}
              className="selectAge"
              onClick={(e) => {
                setIsOpen(!isOpen);
              }}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            >
              <option disabled selected value="나이">
                {'나이'}
              </option>
              ;{ageOptions}
            </select>
       </div> } */

// function DropDown(props) {

//   const [age, setAge] = useState('나이');
//   const ageRange = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'];
//   const ageOptions = ageRange.map((value) => {
//     return <option value={value}>{value}</option>;
//   });
//   const dropDownRef = useRef();
//   const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

//   return (
//     <div className={props.divClassName} ref={dropDownRef}>
//     <select
//       value={props.value}
//       className={props.selectClassName}
//       onClick={(e) => {
//         setIsOpen(!isOpen);
//       }}
//       onChange={(e) => {
//         setAge(e.target.value);
//       }}
//     >
//       <option disabled selected value="나이">
//         {'나이'}
//       </option>
//       ;{props.}
//     </select>
//   </div>
//   )
// }

// const useDetectClose = (ref, initialState) => {
//   // initialState : true, false
//   const [isOpen, setIsOpen] = useState(initialState);

//   // 사용자가 클릭한 요소(ref.current)
//   // 안의 요소(ref.current.contains(e.target)인지 확인 후 닫아주는 구조
//   // -> dropdown에 적용해보자면 dropdown(ref.current) 누르고
//   // 포함된 요소 ex) 22 (ref.current.contains)를 누르면 닫아줌
//   useEffect(() => {
//     const pageClickEvent = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setIsOpen(!isOpen);
//       }
//     };

//     if (isOpen) window.addEventListener('click', pageClickEvent);

//     return () => {
//       window.removeEventListener('click', pageClickEvent);
//     };
//   }, [isOpen, ref]);

//   return [isOpen, setIsOpen];
// };

// export {DropDown as default, useDetectClose}
