import React, { useState } from 'react';
import { authAPI } from '../services/api';

const TestRegister = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    try {
      const response = await authAPI.register({
        name: 'Teste Usuario',
        email: 'teste.usuario@exemplo.com',
        password: 'senha123456',
        password_confirmation: 'senha123456'
      });
      setResult({ success: true, data: response.data });
    } catch (error) {
      setResult({ 
        success: false, 
        error: error.response?.data || error.message 
      });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Teste de Registro</h2>
      <button 
        onClick={testRegister} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testando...' : 'Testar Registro'}
      </button>
      
      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: result.success ? '#e8f5e8' : '#ffe8e8',
          borderRadius: '5px',
          border: `1px solid ${result.success ? '#4caf50' : '#f44336'}`
        }}>
          <h3>{result.success ? 'Sucesso!' : 'Erro!'}</h3>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(result.success ? result.data : result.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestRegister; 