// FormPage.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './FormPage.css';
import {toast} from 'react-hot-toast';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8e44ad;
  }
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8e44ad;
  }
`;

const StyledTextarea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  min-height: 100px;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8e44ad;
  }
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #8e44ad;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6c3886;
  }
`;

const StyledError = styled.div`
  color: red;
  font-weight: bold;
`;

const languages = [
  "Python (3.8.1)",
  "Plain Text",
  "C++ (GCC 7.4.0)",
  "Assembly (NASM 2.14.02)",
  "Bash (5.0.0)",
  "Basic (FBC 1.07.1)",
  "C (Clang 7.0.1)",
  "C++ (Clang 7.0.1)",
  "C (GCC 7.4.0)",
  "C (GCC 8.3.0)",
  "C++ (GCC 8.3.0)",
  "C (GCC 9.2.0)",
  "C++ (GCC 9.2.0)",
  "Clojure (1.10.1)",
  "C# (Mono 6.6.0.161)",
  "COBOL (GnuCOBOL 2.2)",
  "Common Lisp (SBCL 2.0.0)",
  "Dart (2.19.2)",
  "D (DMD 2.089.1)",
  "Elixir (1.9.4)",
  "Erlang (OTP 22.2)",
  "Executable",
  "F# (.NET Core SDK 3.1.202)",
  "Fortran (GFortran 9.2.0)",
  "Go (1.13.5)",
  "Go (1.18.5)",
  "Groovy (3.0.3)",
  "Haskell (GHC 8.8.1)",
  "Java (JDK 17.0.6)",
  "Java (OpenJDK 13.0.1)",
  "JavaScript (Node.js 12.14.0)",
  "JavaScript (Node.js 18.15.0)",
  "Kotlin (1.3.70)",
  "Lua (5.3.5)",
  "Multi-file program",
  "Objective-C (Clang 7.0.1)",
  "OCaml (4.09.0)",
  "Octave (5.1.0)",
  "Pascal (FPC 3.0.4)",
  "Perl (5.28.1)",
  "PHP (7.4.1)",
  "Prolog (GNU Prolog 1.4.5)",
  "Python (2.7.17)",
  "Python (3.11.2)",
  "R (4.0.0)",
  "Ruby (2.7.0)",
  "Rust (1.40.0)",
  "Scala (2.13.2)",
  "SQL (SQLite 3.27.2)",
  "Swift (5.2.3)",
  "TypeScript (3.7.4)",
  "TypeScript (5.0.3)",
  "Visual Basic.Net (vbnc 0.0.0.5943)"
];

function FormPage() {
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !language || !sourceCode) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      
      
      const response = await axios.post('https://app-backend-58w2.onrender.com/submit', {
        username,
        language,
        source_code: sourceCode,
        stdin,
      });
      toast.success(response.data.message);
      setUsername('');
      setLanguage('');
      setStdin('');
      setSourceCode('');
      setError('');
    } catch (error) {
      console.error(error);
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <StyledSelect
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        required
      >
        <option value="">Select a language</option>
        {languages.map((lang) => (
          <option key={lang} value={`${lang}`}>
            {lang}
          </option>
        ))}
      </StyledSelect>
      <StyledTextarea
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
        placeholder="Stdin"
      />
      <StyledTextarea
        value={sourceCode}
        onChange={(e) => setSourceCode(e.target.value)}
        placeholder="Source Code"
        required
      />
      {error && <StyledError>{error}</StyledError>}
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}

export default FormPage;