const axios = require('axios');

const getBenchmarks = async (toolName) => {
  try {
    // Free public API - no key needed
    const res = await axios.get(
      `https://paperswithcode.com/api/v1/sota/?task=code-generation&format=json`,
      { timeout: 10000 }
    );
    
    const results = res.data?.results || [];
    // Find matching model
    const match = results.find(r => 
      r.model_name?.toLowerCase().includes(toolName.toLowerCase()) ||
      toolName.toLowerCase().includes(r.model_name?.toLowerCase())
    );
    
    if (match) {
      return {
        humanEval: parseFloat(match.metrics?.['Pass@1'] || match.metrics?.['HumanEval'] || 0),
        mbpp: parseFloat(match.metrics?.['MBPP'] || 0)
      };
    }
    return null;
  } catch (err) {
    return null;
  }
};

module.exports = getBenchmarks; 