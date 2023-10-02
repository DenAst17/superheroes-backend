import { Superhero } from '../entities/superhero.entity.js';
describe('CRUD tests', () => {

  test('Get all', async() => {
    const response = await fetch("http://localhost:4200/api/superheroes");
    const result = await response.json();
    expect(result).toEqual(expect.arrayContaining([]));
  })

  test('Get one', async() => {
    const superheroes = await fetch("http://localhost:4200/api/superheroes");
    const id = (await superheroes.json() as Array<Superhero>)[0].id;
    const response = await fetch("http://localhost:4200/api/superheroes/" + id);
    const result = await response.json();
    expect(result).toEqual(expect.objectContaining({}));
  })
  test('Delete wrong superhero', async() => {
    const superheroes = await fetch("http://localhost:4200/api/superheroes");
    const id = "long";
    const response = await fetch("http://localhost:4200/api/superheroes/" + id, {
      method: "DELETE",
    });
    const status = await response.status;
    console.log(status);
    expect(status).toEqual(500);
  })
  
  test('Post superhero', async() => {
    const form = new FormData();

    form.append("nickname", "test");
    form.append("real_name", "test");
    form.append("origin_description", "test");
    form.append("superpowers", "test");
    form.append("catch_phrase", "test");

    const response = await fetch("http://localhost:4200/api/superheroes/", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: form
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    expect(result).toEqual(expect.objectContaining({}));
  })

  test('Put superhero', async() => {
    const superheroes = await fetch("http://localhost:4200/api/superheroes");
    const superheroesArray = await superheroes.json() as Array<Superhero>;
    superheroesArray.sort();
    console.log(superheroesArray);
    const id = superheroesArray[superheroesArray.length - 1].id;

    const form = new FormData();

    form.append("nickname", "testUpdated");
    form.append("real_name", "testUpdated");
    form.append("origin_description", "testUpdated");
    form.append("superpowers", "testUpdated");
    form.append("catch_phrase", "testUpdated");

    const response = await fetch("http://localhost:4200/api/superheroes/" + id, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: form
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    expect(result).toEqual(expect.objectContaining({}));
  })
  
});