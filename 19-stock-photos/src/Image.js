import React from 'react'


const Image = ({ alt_description, likes, urls, user }) => {

    const { regular: image } = urls
    const { name, portfolio_url, profile_image: {medium} } = user

    return (
        <article className="image-container">
            <img 
                src={image} 
                alt={alt_description} 
                className="image"
            />
            <div className="image-info">
                <div>
                    <h4 className="user-name">{name}</h4>
                    <p className="likes">{likes} likes</p>
                </div>
                <a href={portfolio_url}>
                    <img src={medium} alt={name} className="user-image" />
                </a>
            </div>
        </article>
    )

}


export default Image
