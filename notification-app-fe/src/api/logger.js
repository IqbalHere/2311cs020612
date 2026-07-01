export async function Log(stack, level, pkg, message) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzExY3MwMjA2MTJAbWFsbGFyZWRkeXVuaXZlcnNpdHkuYWMuaW4iLCJleHAiOjE3ODI4OTE1MTYsImlhdCI6MTc4Mjg5MDYxNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQ1MWVmY2IxLTk1ZWMtNGIwZi1hZjQzLTFhOTkxZmMyZTM0OSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYSBtb2hhbW1hZCBpcWJhbCBodXNzYWluIiwic3ViIjoiYzc4OGJlN2MtYzNhYS00MDYxLWI5M2MtN2EzNGRlYThhMThmIn0sImVtYWlsIjoiMjMxMWNzMDIwNjEyQG1hbGxhcmVkZHl1bml2ZXJzaXR5LmFjLmluIiwibmFtZSI6InNoYSBtb2hhbW1hZCBpcWJhbCBodXNzYWluIiwicm9sbE5vIjoiMjMxMWNzMDIwNjEyIiwiYWNjZXNzQ29kZSI6InhwUWRkZCIsImNsaWVudElEIjoiYzc4OGJlN2MtYzNhYS00MDYxLWI5M2MtN2EzNGRlYThhMThmIiwiY2xpZW50U2VjcmV0IjoiRUtNVUVxR0hIVFZrYlVBeCJ9.2DVJd-Kor9_is6ncb2NFrHu8KjBSdsoIeEcT3z2O95k";
  const res = await fetch("http://4.224.186.213/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      stack,
      level,
      package: pkg,
      message
    })
  });

  const data = await res.json();
  return data;
}
