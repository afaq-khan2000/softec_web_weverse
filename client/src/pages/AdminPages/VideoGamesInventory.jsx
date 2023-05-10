import React, { useEffect, useState } from 'react';
import Table from '../../components/adminPanelComponents/Table';
import TableDataImage from '../../components/adminPanelComponents/Table/TableDataImage';
import { getGames } from '../../api/ItemsAPI';
import { AiFillEdit, AiOutlineLoading } from 'react-icons/ai';

function VideoGamesInventory(props) {
  const [previewUrl, setPreviewUrl] = useState(null);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    marketPrice: '',
    costPrice: '',
    type: '',
    stock: '',
    minAge: '',
    image: '',
  });

  useEffect(() => {
    setLoading(true);
    getGames()
      .then((res) => {
        setGames(res.items);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='d-flex flex-column w-100'>
      <div className='d-flex justify-content-between align-items-center m-3'>
        <h1 className='font-clash'>Video Games Inventory</h1>
      </div>
      {loading ? (
        <AiOutlineLoading />
      ) : (
        <Table>
          <thead>
            <tr className=''>
              <th scope='col'>Image</th>
              <th scope='col'>Title</th>
              <th scope='col'>Market Price</th>
              <th scope='col'>Cost Price</th>
              <th scope='col'>Type</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Minimum Age</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {games.map((game, key) => (
              <tr key={key}>
                <TableDataImage src={game.image} />
                <td>{game.title}</td>
                <td>{game.marketPrice}</td>
                <td>{game.costPrice}</td>
                <td> {game.type}</td>
                <td> {game.stock}</td>
                <td> {game.minAge}</td>
                <td>
                  <AiFillEdit
                    type='button'
                    data-toggle='modal'
                    data-target='#exampleModal1'
                    onClick={() => {
                      setModalData({
                        title: game.title,
                        description: game.description,
                        marketPrice: game.marketPrice,
                        costPrice: game.costPrice,
                        type: game.type,
                        stock: game.stock,
                        minAge: game.minAge,
                        image: game.image,
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <div
        className='modal fade'
        id='exampleModal1'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModal1Label'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModal1Label'>
                Add Inventory
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='row'>
                  <div className='col-6'>
                    <img
                      src={previewUrl || modalData.image}
                      alt='Preview'
                      style={{ height: '150px', width: '150px' }}
                    />
                  </div>
                  <div className='col-6'>
                    <div className='form-group'>
                      <label htmlFor='image'>Image File</label>
                      <input
                        type='file'
                        className='form-control-file'
                        id='image'
                        onChange={(event) => {
                          const file = event.target.files[0];
                          setModalData({
                            ...modalData,
                            image: file,
                          });
                          setPreviewUrl(URL.createObjectURL(file));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='type'>Type</label>
                  <select
                    className='form-control'
                    id='type'
                    onChange={(event) => {
                      setModalData({
                        ...modalData,
                        type: event.target.value,
                      });
                    }}
                    value={modalData.type}
                  >
                    <option value={'VideoGame'}>Video Game</option>
                    <option value={'GamingGear'}>Gaming Gear</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input type='text' className='form-control' id='title' />
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    rows={'3'}
                    className='form-control'
                    id='description'
                    value={modalData.description}
                    onChange={(event) => {
                      setModalData({
                        ...modalData,
                        description: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <div className='form-group'>
                      <label htmlFor='marketPrice'>Market Price</label>
                      <input
                        type='number'
                        className='form-control'
                        id='marketPrice'
                        onChange={(event) => {
                          setModalData({
                            ...modalData,
                            marketPrice: event.target.value,
                          });
                        }}
                        value={modalData.marketPrice}
                      />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='form-group'>
                      <label htmlFor='costPrice'>Cost Price</label>
                      <input
                        type='number'
                        className='form-control'
                        id='costPrice'
                        onChange={(event) => {
                          setModalData({
                            ...modalData,
                            costPrice: event.target.value,
                          });
                        }}
                        value={modalData.costPrice}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <div className='form-group'>
                      <label htmlFor='stock'>Stock</label>
                      <input
                        type='number'
                        className='form-control'
                        id='stock'
                        onChange={(event) => {
                          setModalData({
                            ...modalData,
                            stock: event.target.value,
                          });
                        }}
                        value={modalData.stock}
                      />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='form-group'>
                      <label htmlFor='minAge'>Age Limit</label>
                      <input
                        type='number'
                        className='form-control'
                        id='minAge'
                        onChange={(event) => {
                          setModalData({
                            ...modalData,
                            minAge: event.target.value,
                          });
                        }}
                        value={modalData.minAge}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGamesInventory;
