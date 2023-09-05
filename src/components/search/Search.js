import { Input, Button } from '@mantine/core';
import './search.css' 
import { Search } from 'tabler-icons-react';
/* import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap'); */
import styled from 'styled-components';

const StyledInput = styled.input`
  ::placeholder {  
    color: red;
  }
`;


function SearchPanel() {
  return (
    <Input.Wrapper 
      className='inputWrapper'
      >
      
      <Input 
        
        size="md"
        radius="md"
        icon={<Search 
              size={18.57}
              strokeWidth={2}
              />}
        placeholder ="Введите название вакансии" 
        inputStyle={{ fontSize: '16px', color: 'blue' }}
        rightSection={
              <Button 
               
              styles={(theme) => ({ 
                root: {
                  backgroundColor: '#5E96FC',
                  marginLeft: -60,
                  width: 83,
                  height: 32,
                  fontSize: 14,
                  

                }
              })}
              /* size="xs" */
              radius="md">
              Поиск
              </Button>
        }/> 
      
    </Input.Wrapper>
  );
}

export default SearchPanel;